import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

/**
 * Breath of the Forge — a Zelda: Breath of the Wild-inspired top-down
 * exploration & combat prototype, rendered on a canvas and styled to
 * match "The Obsidian Forge" design system.
 *
 * Controls:
 *   Move ......... WASD / Arrow keys
 *   Sprint ....... Shift (drains stamina)
 *   Attack ....... Space / J / Left-click
 *   Restart ...... R (when defeated / victorious)
 *
 * Goal: clear the Bokoblin camps, gather Korok seeds, and reach the
 * glowing shrine to complete the trial.
 */

// ---- Brand palette (mirrors tailwind.config brand colors) ----
const COLOR = {
  base: '#0E0E0E',
  surface: '#131313',
  surfaceHigh: '#2A2A2A',
  amber: '#FFB68C',
  amberDim: '#8a5f48',
  secondary: '#C8C6C6',
  outline: '#444748',
  heart: '#FF6B6B',
  heartEmpty: '#3a2020',
  stamina: '#9BE38C',
  bokoblin: '#B4634A',
  bokoblinDark: '#5c2f22',
  korok: '#C8E38C',
  shrine: '#FFB68C',
  grass: '#161616',
  grass2: '#191919',
}

const WORLD = { w: 2400, h: 1800 }
const VIEW = { w: 880, h: 560 }

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const dist = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by)

function makeInitialState() {
  const player = {
    x: WORLD.w / 2,
    y: WORLD.h / 2,
    r: 16,
    speed: 2.6,
    sprintSpeed: 4.6,
    dir: { x: 0, y: 1 },
    maxHearts: 5,
    hearts: 5,
    stamina: 1,
    invuln: 0,
    attackTimer: 0,
    attackCooldown: 0,
    facing: 1,
  }

  // Scatter Bokoblins in loose "camps"
  const enemies = []
  const camps = [
    { x: 520, y: 460, n: 3 },
    { x: 1900, y: 520, n: 4 },
    { x: 640, y: 1400, n: 3 },
    { x: 1850, y: 1350, n: 4 },
    { x: 1200, y: 300, n: 2 },
  ]
  camps.forEach((c) => {
    for (let i = 0; i < c.n; i++) {
      enemies.push({
        x: c.x + (Math.cos((i / c.n) * Math.PI * 2) * 70),
        y: c.y + (Math.sin((i / c.n) * Math.PI * 2) * 70),
        homeX: c.x,
        homeY: c.y,
        r: 15,
        hp: 2,
        maxHp: 2,
        hitFlash: 0,
        knockback: { x: 0, y: 0 },
        wander: { x: 0, y: 0, t: 0 },
        alive: true,
        attackCooldown: 0,
      })
    }
  })

  // Korok seeds
  const koroks = []
  const spots = [
    [300, 300], [2100, 300], [300, 1500], [2100, 1500],
    [1200, 900], [800, 1000], [1600, 800], [1000, 1500], [1500, 1550],
  ]
  spots.forEach(([x, y]) => koroks.push({ x, y, r: 12, found: false, bob: Math.random() * 6 }))

  // Decorative rocks / trees as simple obstacles
  const obstacles = []
  const rng = mulberry32(1337)
  for (let i = 0; i < 46; i++) {
    obstacles.push({
      x: 120 + rng() * (WORLD.w - 240),
      y: 120 + rng() * (WORLD.h - 240),
      r: 18 + rng() * 22,
      kind: rng() > 0.5 ? 'rock' : 'tree',
    })
  }

  const shrine = { x: WORLD.w / 2, y: 160, r: 46, active: false }

  return {
    player,
    enemies,
    koroks,
    obstacles,
    shrine,
    camera: { x: 0, y: 0 },
    status: 'playing', // 'playing' | 'won' | 'lost'
    time: 0,
    hitStop: 0,
  }
}

// Small deterministic PRNG so obstacle layout is stable across restarts.
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function ZeldaGame() {
  const canvasRef = useRef(null)
  const stateRef = useRef(makeInitialState())
  const keysRef = useRef({})
  const rafRef = useRef(0)
  const attackQueuedRef = useRef(false)

  // React state mirrors just enough for the HUD overlay.
  const [hud, setHud] = useState({
    hearts: 5,
    maxHearts: 5,
    stamina: 1,
    enemiesLeft: 16,
    koroks: 0,
    korokTotal: 9,
    status: 'playing',
    shrineActive: false,
  })

  const resetGame = useCallback(() => {
    stateRef.current = makeInitialState()
  }, [])

  // ---- Input ----
  useEffect(() => {
    const down = (e) => {
      const k = e.key.toLowerCase()
      keysRef.current[k] = true
      if ([' ', 'j'].includes(k)) {
        attackQueuedRef.current = true
        e.preventDefault()
      }
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault()
      if (k === 'r' && stateRef.current.status !== 'playing') resetGame()
    }
    const up = (e) => {
      keysRef.current[e.key.toLowerCase()] = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [resetGame])

  // ---- Main loop ----
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let last = performance.now()
    let hudAccum = 0
    // Opt-in test hook (only with ?debug) — never present in normal play.
    const exposeState =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).has('debug')

    const onClick = () => {
      if (stateRef.current.status === 'playing') attackQueuedRef.current = true
      else resetGame()
    }
    canvas.addEventListener('mousedown', onClick)

    const step = (now) => {
      const dt = Math.min(33, now - last) / 16.67 // normalized to ~60fps units
      last = now
      const s = stateRef.current

      // Brief "hit stop" freeze on impact for game feel (measured in ms).
      if (s.hitStop > 0) {
        s.hitStop = Math.max(0, s.hitStop - dt * 16.67)
      }

      if (s.status === 'playing' && s.hitStop <= 0) {
        update(s, dt, keysRef.current, attackQueuedRef)
        attackQueuedRef.current = false
      }

      render(ctx, s)

      if (exposeState) window.__zelda = s

      // Throttle HUD react-state updates (~15fps) to avoid churn.
      hudAccum += dt
      if (hudAccum > 4) {
        hudAccum = 0
        const enemiesLeft = s.enemies.filter((e) => e.alive).length
        const koroks = s.koroks.filter((k) => k.found).length
        setHud({
          hearts: s.player.hearts,
          maxHearts: s.player.maxHearts,
          stamina: s.player.stamina,
          enemiesLeft,
          koroks,
          korokTotal: s.koroks.length,
          status: s.status,
          shrineActive: s.shrine.active,
        })
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousedown', onClick)
    }
  }, [resetGame])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-6">
          <p className="text-brand-amber font-heading text-sm uppercase tracking-[0.3em] mb-2">
            An Obsidian Forge Trial
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-3">
            Breath of the Forge
          </h1>
          <p className="text-brand-secondary text-sm max-w-xl mx-auto">
            Clear the Bokoblin camps, gather the hidden Korok seeds, and light the shrine.
          </p>
        </div>

        <div
          className="relative mx-auto"
          style={{ maxWidth: VIEW.w, aspectRatio: `${VIEW.w} / ${VIEW.h}` }}
        >
          <canvas
            ref={canvasRef}
            width={VIEW.w}
            height={VIEW.h}
            className="w-full h-full block cursor-pointer touch-none"
            style={{
              imageRendering: 'auto',
              border: `1px solid ${COLOR.outline}`,
              background: COLOR.base,
            }}
          />

          <Hud hud={hud} onRestart={resetGame} />
        </div>

        <ControlsLegend />
      </motion.div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Simulation
// ---------------------------------------------------------------------------
function update(s, dt, keys, attackQueuedRef) {
  s.time += dt
  const p = s.player

  // --- Movement input ---
  let mx = 0
  let my = 0
  if (keys['w'] || keys['arrowup']) my -= 1
  if (keys['s'] || keys['arrowdown']) my += 1
  if (keys['a'] || keys['arrowleft']) mx -= 1
  if (keys['d'] || keys['arrowright']) mx += 1

  const moving = mx !== 0 || my !== 0
  if (moving) {
    const len = Math.hypot(mx, my) || 1
    mx /= len
    my /= len
    p.dir = { x: mx, y: my }
    if (mx !== 0) p.facing = mx > 0 ? 1 : -1
  }

  // --- Sprint & stamina ---
  const wantSprint = (keys['shift'] || keys['shiftleft'] || keys['shiftright']) && moving && p.stamina > 0.02
  let speed = p.speed
  if (wantSprint) {
    speed = p.sprintSpeed
    p.stamina = clamp(p.stamina - 0.006 * dt, 0, 1)
  } else {
    p.stamina = clamp(p.stamina + 0.004 * dt, 0, 1)
  }

  if (moving) {
    tryMove(p, mx * speed * dt, my * speed * dt, s.obstacles)
    p.x = clamp(p.x, p.r, WORLD.w - p.r)
    p.y = clamp(p.y, p.r, WORLD.h - p.r)
  }

  // --- Attack ---
  if (p.attackCooldown > 0) p.attackCooldown -= dt
  if (attackQueuedRef.current && p.attackCooldown <= 0) {
    p.attackTimer = 12
    p.attackCooldown = 22
    // Hit any enemy within a forward arc.
    const reach = 46
    s.enemies.forEach((e) => {
      if (!e.alive) return
      const d = dist(p.x, p.y, e.x, e.y)
      if (d < reach + e.r) {
        const dx = e.x - p.x
        const dy = e.y - p.y
        const dot = (dx * p.dir.x + dy * p.dir.y) / (d || 1)
        if (dot > 0.15 || d < e.r + p.r + 6) {
          e.hp -= 1
          e.hitFlash = 10
          const kb = 9
          const nl = Math.hypot(dx, dy) || 1
          e.knockback.x += (dx / nl) * kb
          e.knockback.y += (dy / nl) * kb
          s.hitStop = 55
          if (e.hp <= 0) e.alive = false
        }
      }
    })
  }
  if (p.attackTimer > 0) p.attackTimer -= dt
  if (p.invuln > 0) p.invuln -= dt

  // --- Enemy AI ---
  s.enemies.forEach((e) => {
    if (!e.alive) return
    if (e.hitFlash > 0) e.hitFlash -= dt

    // knockback decays
    e.x += e.knockback.x * dt
    e.y += e.knockback.y * dt
    e.knockback.x *= 0.82
    e.knockback.y *= 0.82

    const d = dist(p.x, p.y, e.x, e.y)
    const aggroRange = 260
    if (d < aggroRange) {
      // chase
      const dx = (p.x - e.x) / (d || 1)
      const dy = (p.y - e.y) / (d || 1)
      tryMove(e, dx * 1.7 * dt, dy * 1.7 * dt, s.obstacles)
      // contact damage
      if (e.attackCooldown > 0) e.attackCooldown -= dt
      if (d < e.r + p.r + 2 && p.invuln <= 0) {
        p.hearts -= 1
        p.invuln = 60
        // knock player back
        p.x -= dx * 26
        p.y -= dy * 26
        s.hitStop = 40
        if (p.hearts <= 0) {
          p.hearts = 0
          s.status = 'lost'
        }
      }
    } else {
      // wander near home
      e.wander.t -= dt
      if (e.wander.t <= 0) {
        const a = Math.random() * Math.PI * 2
        e.wander.x = Math.cos(a) * 0.6
        e.wander.y = Math.sin(a) * 0.6
        e.wander.t = 40 + Math.random() * 60
      }
      const backX = (e.homeX - e.x) * 0.004
      const backY = (e.homeY - e.y) * 0.004
      tryMove(e, (e.wander.x + backX) * dt, (e.wander.y + backY) * dt, s.obstacles)
    }
    e.x = clamp(e.x, e.r, WORLD.w - e.r)
    e.y = clamp(e.y, e.r, WORLD.h - e.r)
  })

  // --- Korok pickups ---
  s.koroks.forEach((k) => {
    if (k.found) return
    if (dist(p.x, p.y, k.x, k.y) < p.r + k.r + 4) {
      k.found = true
    }
  })

  // --- Shrine activation ---
  const enemiesLeft = s.enemies.filter((e) => e.alive).length
  s.shrine.active = enemiesLeft === 0
  if (s.shrine.active && dist(p.x, p.y, s.shrine.x, s.shrine.y) < p.r + s.shrine.r) {
    s.status = 'won'
  }

  // --- Camera follows player ---
  s.camera.x = clamp(p.x - VIEW.w / 2, 0, WORLD.w - VIEW.w)
  s.camera.y = clamp(p.y - VIEW.h / 2, 0, WORLD.h - VIEW.h)
}

// Move an entity while sliding around circular obstacles (axis-separated).
function tryMove(ent, dx, dy, obstacles) {
  const testX = ent.x + dx
  if (!collides(testX, ent.y, ent.r, obstacles)) ent.x = testX
  const testY = ent.y + dy
  if (!collides(ent.x, testY, ent.r, obstacles)) ent.y = testY
}

function collides(x, y, r, obstacles) {
  for (let i = 0; i < obstacles.length; i++) {
    const o = obstacles[i]
    if (dist(x, y, o.x, o.y) < r + o.r * 0.7) return true
  }
  return false
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
function render(ctx, s) {
  const cam = s.camera
  ctx.clearRect(0, 0, VIEW.w, VIEW.h)

  // Ground
  ctx.fillStyle = COLOR.base
  ctx.fillRect(0, 0, VIEW.w, VIEW.h)

  // Subtle grid "terrain" texture
  const tile = 80
  const startX = -(cam.x % tile)
  const startY = -(cam.y % tile)
  for (let gx = startX; gx < VIEW.w; gx += tile) {
    for (let gy = startY; gy < VIEW.h; gy += tile) {
      const worldTileX = Math.floor((gx + cam.x) / tile)
      const worldTileY = Math.floor((gy + cam.y) / tile)
      ctx.fillStyle = (worldTileX + worldTileY) % 2 === 0 ? COLOR.grass : COLOR.grass2
      ctx.fillRect(gx, gy, tile, tile)
    }
  }

  // World border
  ctx.strokeStyle = COLOR.amberDim
  ctx.lineWidth = 3
  ctx.strokeRect(-cam.x, -cam.y, WORLD.w, WORLD.h)

  const toScreen = (wx, wy) => [wx - cam.x, wy - cam.y]
  const onScreen = (wx, wy, pad = 60) => {
    const [sx, sy] = toScreen(wx, wy)
    return sx > -pad && sx < VIEW.w + pad && sy > -pad && sy < VIEW.h + pad
  }

  // Shrine
  {
    const [sx, sy] = toScreen(s.shrine.x, s.shrine.y)
    const pulse = 0.5 + 0.5 * Math.sin(s.time * 0.08)
    ctx.save()
    if (s.shrine.active) {
      const glow = ctx.createRadialGradient(sx, sy, 4, sx, sy, s.shrine.r * 2.2)
      glow.addColorStop(0, 'rgba(255,182,140,0.55)')
      glow.addColorStop(1, 'rgba(255,182,140,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(sx, sy, s.shrine.r * 2.2, 0, Math.PI * 2)
      ctx.fill()
    }
    // pedestal
    ctx.fillStyle = s.shrine.active ? COLOR.shrine : COLOR.surfaceHigh
    ctx.fillRect(sx - s.shrine.r, sy - s.shrine.r, s.shrine.r * 2, s.shrine.r * 2)
    ctx.strokeStyle = s.shrine.active ? '#fff' : COLOR.outline
    ctx.lineWidth = 2
    ctx.strokeRect(sx - s.shrine.r, sy - s.shrine.r, s.shrine.r * 2, s.shrine.r * 2)
    // Sheikah "eye" mark
    ctx.fillStyle = s.shrine.active ? COLOR.base : COLOR.amberDim
    ctx.globalAlpha = s.shrine.active ? 0.7 + 0.3 * pulse : 0.6
    ctx.beginPath()
    ctx.ellipse(sx, sy, s.shrine.r * 0.5, s.shrine.r * 0.3, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.restore()
  }

  // Obstacles
  s.obstacles.forEach((o) => {
    if (!onScreen(o.x, o.y, o.r + 20)) return
    const [ox, oy] = toScreen(o.x, o.y)
    if (o.kind === 'tree') {
      ctx.fillStyle = COLOR.amberDim
      ctx.fillRect(ox - 3, oy, 6, o.r * 0.7)
      ctx.fillStyle = '#243024'
      ctx.beginPath()
      ctx.arc(ox, oy - o.r * 0.3, o.r, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#2e3a2e'
      ctx.beginPath()
      ctx.arc(ox - o.r * 0.3, oy - o.r * 0.5, o.r * 0.6, 0, Math.PI * 2)
      ctx.fill()
    } else {
      ctx.fillStyle = COLOR.surfaceHigh
      ctx.beginPath()
      ctx.arc(ox, oy, o.r * 0.85, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = COLOR.outline
      ctx.beginPath()
      ctx.arc(ox - o.r * 0.2, oy - o.r * 0.2, o.r * 0.5, 0, Math.PI * 2)
      ctx.fill()
    }
  })

  // Koroks
  s.koroks.forEach((k) => {
    if (k.found || !onScreen(k.x, k.y)) return
    const [kx, ky] = toScreen(k.x, k.y)
    const bob = Math.sin(s.time * 0.1 + k.bob) * 3
    ctx.fillStyle = COLOR.korok
    ctx.beginPath()
    ctx.arc(kx, ky + bob, k.r, 0, Math.PI * 2)
    ctx.fill()
    // little leaf
    ctx.fillStyle = '#7fae5c'
    ctx.beginPath()
    ctx.moveTo(kx, ky + bob - k.r)
    ctx.lineTo(kx - 5, ky + bob - k.r - 8)
    ctx.lineTo(kx + 5, ky + bob - k.r - 8)
    ctx.closePath()
    ctx.fill()
    // face dots
    ctx.fillStyle = COLOR.base
    ctx.fillRect(kx - 4, ky + bob - 2, 2, 4)
    ctx.fillRect(kx + 2, ky + bob - 2, 2, 4)
  })

  // Enemies
  s.enemies.forEach((e) => {
    if (!e.alive || !onScreen(e.x, e.y)) return
    const [ex, ey] = toScreen(e.x, e.y)
    ctx.fillStyle = e.hitFlash > 0 ? '#ffffff' : COLOR.bokoblin
    ctx.beginPath()
    ctx.arc(ex, ey, e.r, 0, Math.PI * 2)
    ctx.fill()
    // horn
    ctx.fillStyle = e.hitFlash > 0 ? '#ffffff' : COLOR.bokoblinDark
    ctx.beginPath()
    ctx.moveTo(ex, ey - e.r)
    ctx.lineTo(ex - 5, ey - e.r - 9)
    ctx.lineTo(ex + 3, ey - e.r - 2)
    ctx.closePath()
    ctx.fill()
    // eyes
    ctx.fillStyle = COLOR.base
    ctx.fillRect(ex - 6, ey - 4, 3, 5)
    ctx.fillRect(ex + 3, ey - 4, 3, 5)
    // hp pips
    for (let i = 0; i < e.maxHp; i++) {
      ctx.fillStyle = i < e.hp ? COLOR.heart : COLOR.heartEmpty
      ctx.fillRect(ex - e.r + i * 9, ey - e.r - 14, 6, 3)
    }
  })

  // Player (Link)
  {
    const p = s.player
    const [px, py] = toScreen(p.x, p.y)
    const flicker = p.invuln > 0 && Math.floor(s.time * 0.4) % 2 === 0
    ctx.save()
    if (!flicker) {
      // body (tunic)
      ctx.fillStyle = '#3f6b3f'
      ctx.beginPath()
      ctx.arc(px, py, p.r, 0, Math.PI * 2)
      ctx.fill()
      // amber trim
      ctx.strokeStyle = COLOR.amber
      ctx.lineWidth = 2
      ctx.stroke()
      // head
      ctx.fillStyle = '#e8c9a0'
      ctx.beginPath()
      ctx.arc(px + p.dir.x * 4, py + p.dir.y * 4 - 4, p.r * 0.55, 0, Math.PI * 2)
      ctx.fill()
      // facing indicator (nose/hood point)
      ctx.fillStyle = COLOR.amber
      ctx.beginPath()
      ctx.arc(px + p.dir.x * p.r, py + p.dir.y * p.r, 3, 0, Math.PI * 2)
      ctx.fill()

      // Sword swing arc
      if (p.attackTimer > 0) {
        const swing = 1 - p.attackTimer / 12
        const baseA = Math.atan2(p.dir.y, p.dir.x)
        const a0 = baseA - 0.9 + swing * 1.8
        ctx.strokeStyle = 'rgba(255,255,255,0.9)'
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(px, py, 40, a0 - 0.4, a0 + 0.4)
        ctx.stroke()
        ctx.strokeStyle = 'rgba(255,182,140,0.5)'
        ctx.lineWidth = 10
        ctx.beginPath()
        ctx.arc(px, py, 40, a0 - 0.5, a0 + 0.5)
        ctx.stroke()
      }
    }
    ctx.restore()
  }

  // Off-screen shrine marker (compass hint)
  if (s.shrine.active) {
    const [sx, sy] = toScreen(s.shrine.x, s.shrine.y)
    if (sx < 0 || sx > VIEW.w || sy < 0 || sy > VIEW.h) {
      const cx = clamp(sx, 20, VIEW.w - 20)
      const cy = clamp(sy, 20, VIEW.h - 20)
      ctx.fillStyle = COLOR.amber
      ctx.beginPath()
      ctx.arc(cx, cy, 6, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

// ---------------------------------------------------------------------------
// HUD overlay (React / DOM on top of canvas)
// ---------------------------------------------------------------------------
function Hud({ hud, onRestart }) {
  return (
    <>
      {/* Top-left: hearts + stamina */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none select-none">
        <div className="flex gap-1">
          {Array.from({ length: hud.maxHearts }).map((_, i) => (
            <Heart key={i} filled={i < hud.hearts} />
          ))}
        </div>
        <div
          className="h-2 w-28 rounded-full overflow-hidden"
          style={{ background: COLOR.heartEmpty }}
        >
          <div
            className="h-full transition-[width] duration-150"
            style={{ width: `${hud.stamina * 100}%`, background: COLOR.stamina }}
          />
        </div>
      </div>

      {/* Top-right: objectives */}
      <div className="absolute top-3 right-3 text-right pointer-events-none select-none font-heading">
        <div className="text-brand-amber text-sm font-semibold">
          Bokoblins: {hud.enemiesLeft}
        </div>
        <div className="text-brand-korok text-sm" style={{ color: COLOR.korok }}>
          Koroks: {hud.koroks}/{hud.korokTotal}
        </div>
        {hud.shrineActive && hud.status === 'playing' && (
          <div className="text-white text-xs mt-1 animate-pulse">Shrine unlocked →</div>
        )}
      </div>

      {/* End screens */}
      {hud.status !== 'playing' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[1px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center px-8 py-10"
          >
            {hud.status === 'won' ? (
              <>
                <h2 className="text-4xl font-heading font-bold text-gradient mb-2">
                  Trial Complete
                </h2>
                <p className="text-brand-secondary mb-1">The shrine glows to life.</p>
                <p className="text-sm mb-6" style={{ color: COLOR.korok }}>
                  Korok seeds found: {hud.koroks}/{hud.korokTotal}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-heading font-bold text-brand-amber mb-2">
                  You Fell
                </h2>
                <p className="text-brand-secondary mb-6">The Bokoblins overwhelmed you.</p>
              </>
            )}
            <button
              onClick={onRestart}
              className="px-6 py-2 font-heading font-semibold text-brand-base transition-colors"
              style={{ background: COLOR.amber }}
            >
              Try Again (R)
            </button>
          </motion.div>
        </div>
      )}
    </>
  )
}

function Heart({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s-7.5-4.9-10-9.2C.3 8.6 1.6 5 5 5c2 0 3.2 1.2 4 2.3C9.8 6.2 11 5 13 5c3.4 0 4.7 3.6 3 6.8C19.5 16.1 12 21 12 21z"
        fill={filled ? COLOR.heart : COLOR.heartEmpty}
        stroke={filled ? '#ff9a9a' : COLOR.outline}
        strokeWidth="1"
      />
    </svg>
  )
}

function ControlsLegend() {
  const items = [
    ['Move', 'WASD / Arrows'],
    ['Sprint', 'Shift'],
    ['Attack', 'Space / Click'],
    ['Restart', 'R'],
  ]
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
      {items.map(([label, keys]) => (
        <div key={label} className="flex items-center gap-2 text-sm">
          <span className="text-brand-secondary">{label}</span>
          <span
            className="px-2 py-0.5 font-heading text-xs text-brand-amber"
            style={{ border: `1px solid ${COLOR.outline}` }}
          >
            {keys}
          </span>
        </div>
      ))}
    </div>
  )
}
