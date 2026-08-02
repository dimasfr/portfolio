<template>
  <div ref="root" class="journey container mx-auto px-4">
    <!-- Parallax hand-drawn fantasy-map background -->
    <div ref="bg" class="journey-bg" aria-hidden="true">
      <!-- defs: reusable map glyphs drawn in the sketch style of the refs -->
      <svg width="0" height="0" style="position:absolute" aria-hidden="true">
        <defs>
          <!-- a layered mountain range -->
          <g id="mtn">
            <path d="M0 60 L26 8 L42 30 L60 -4 L82 34 L104 6 L128 60 Z" />
            <path d="M26 8 L33 26 M60 -4 L70 22 M104 6 L112 26" stroke-opacity="0.6" />
            <path d="M8 60 Q20 50 30 60 M70 60 Q84 50 96 60" stroke-opacity="0.4" />
          </g>
          <!-- a small mountain -->
          <g id="hill">
            <path d="M0 34 L20 4 L34 22 L48 0 L66 34 Z" />
            <path d="M20 4 L26 18 M48 0 L56 18" stroke-opacity="0.55" />
          </g>
          <!-- a pine tree -->
          <g id="pine">
            <path d="M10 0 L2 14 L7 14 L0 26 L8 26 L8 32 L12 32 L12 26 L20 26 L13 14 L18 14 Z" />
          </g>
          <!-- a distant bird, a simple double-arc wing shape -->
          <g id="bird">
            <path d="M0 6 Q5 0 10 6 Q15 0 20 6" />
          </g>
          <!-- a hot air balloon, drifting decoration -->
          <symbol id="balloon" viewBox="0 0 60 96" overflow="visible">
            <g fill="none" stroke-linejoin="round" stroke-linecap="round">
              <path stroke-width="1.6" d="M30 2 C10 2 4 26 12 42 C17 52 24 56 24 64 h12 c0 -8 7 -12 12 -22 C56 26 50 2 30 2 Z"/>
              <path stroke-width="1" stroke-opacity="0.6" d="M30 2 C24 20 24 46 24 64 M30 2 C36 20 36 46 36 64 M12 42 C20 46 40 46 48 42"/>
              <path stroke-width="1.2" d="M24 64 L18 78 M36 64 L42 78"/>
              <path stroke-width="1.4" d="M18 78 h24 v10 h-24 Z"/>
            </g>
          </symbol>
          <!-- a windmill with rotating sails -->
          <symbol id="windmill" viewBox="0 0 120 160" overflow="visible">
            <g fill="none" stroke-linejoin="round" stroke-linecap="round">
              <path stroke-width="2" d="M46 160 L52 60 L68 60 L74 160 Z"/>
              <path stroke-width="1.2" d="M50 130 h20 M48 100 h24 M52 76 h16"/>
              <path stroke-width="1.4" d="M42 60 h36 l-6 -12 h-24 Z"/>
              <g class="windmill-sails" style="transform-origin: 60px 54px;">
                <circle cx="60" cy="54" r="3" stroke-width="1.4"/>
                <path stroke-width="1.6" d="M60 54 L60 14 L48 6 M60 54 L60 14 L72 6"/>
                <path stroke-width="1.6" d="M60 54 L98 54 L106 44 M60 54 L98 54 L106 64"/>
                <path stroke-width="1.6" d="M60 54 L60 94 L72 102 M60 54 L60 94 L48 102"/>
                <path stroke-width="1.6" d="M60 54 L22 54 L14 64 M60 54 L22 54 L14 44"/>
              </g>
            </g>
          </symbol>
          <!-- a faint glowing magic rune -->
          <symbol id="rune" viewBox="0 0 40 40" overflow="visible">
            <g fill="none" stroke-linejoin="round" stroke-linecap="round" class="rune-glow">
              <circle cx="20" cy="20" r="16" stroke-width="1"/>
              <path stroke-width="1.3" d="M20 6 L20 34 M10 12 L30 28 M30 12 L10 28"/>
              <circle cx="20" cy="20" r="3" stroke-width="1" fill="currentColor" fill-opacity="0.4"/>
            </g>
          </symbol>
          <!-- a tall conical peak with clouds (ref image 2) -->
          <g id="spire">
            <path d="M60 4 L40 120 Q60 132 84 120 Z" />
            <path d="M40 120 Q30 150 10 158 M84 120 Q98 150 120 156" stroke-opacity="0.55" />
            <path d="M48 70 L64 72 M44 96 L80 98" stroke-opacity="0.4" />
            <path d="M-4 16 q14 -10 30 0 q14 -8 26 0" stroke-opacity="0.5" />
            <path d="M86 30 q14 -9 28 0 q12 -7 22 0" stroke-opacity="0.5" />
          </g>
          
          <!-- a castle: hilltop complex, hand-inked outline (ref image 1).
               Symbol box 640x420; scale via width/height on <use>. -->
          <symbol id="castle" viewBox="0 0 640 420" overflow="visible">
            <g fill="none" stroke="var(--map-node)" stroke-linejoin="round" stroke-linecap="round">
              <!-- GREAT KEEP -->
              <g stroke-width="2.4">
                <path d="M168 150 L168 300 L300 300 L300 150"/>
                <path d="M150 150 L234 34 L318 150 Z"/>
              </g>
              <g stroke-width="1.2">
                <path d="M234 34 L234 150"/>
                <path d="M150 150 L234 70 L318 150"/>
                <path d="M210 96 l6 8 M250 96 l6 8 M226 120 l6 8 M262 120 l6 8 M198 124 l6 8 M278 96 l6 8"/>
                <path d="M234 34 L234 22 M228 26 l6 -4 6 4"/>
              </g>
              <g stroke-width="1.3">
                <path d="M186 176 h18 v34 a9 9 0 0 0 -18 0 z M214 176 h18 v34 a9 9 0 0 0 -18 0 z M242 176 h18 v34 a9 9 0 0 0 -18 0 z M270 176 h18 v34 a9 9 0 0 0 -18 0 z"/>
                <path d="M186 232 h18 v30 M214 232 h18 v30 M242 232 h18 v30 M270 232 h18 v30"/>
                <path d="M186 262 h102"/>
              </g>
              <!-- turret beside keep -->
              <g stroke-width="2">
                <path d="M300 196 L300 300 L334 300 L334 196"/>
                <path d="M294 196 L317 162 L340 196 Z"/>
              </g>
              <g stroke-width="1.2">
                <path d="M317 162 L317 150 M312 154 l5 -4 5 4"/>
                <path d="M308 214 h18 v22 a9 9 0 0 0 -18 0 z"/>
              </g>
              <!-- RIGHT HALL -->
              <g stroke-width="2.2">
                <path d="M334 232 L334 312 L520 312 L520 232 Z"/>
                <path d="M330 232 L360 206 L500 206 L530 232 Z"/>
              </g>
              <g stroke-width="1.2">
                <path d="M346 250 h16 v34 h-16 z M372 250 h16 v34 h-16 z M398 250 h16 v34 h-16 z M424 250 h16 v34 h-16 z M450 250 h16 v34 h-16 z M476 250 h16 v34 h-16 z"/>
                <path d="M346 264 h146"/>
                <path d="M372 206 l8 -10 8 10 M420 206 l8 -10 8 10 M468 206 l8 -10 8 10"/>
              </g>
              <!-- far-right pointed towers -->
              <g stroke-width="2">
                <path d="M520 252 L520 312 L556 312 L556 252"/>
                <path d="M514 252 L538 214 L562 252 Z"/>
                <path d="M556 266 L556 312 L588 312 L588 266"/>
                <path d="M550 266 L572 232 L594 266 Z"/>
                <path d="M588 278 L588 312 L616 312 L616 278"/>
                <path d="M582 278 L602 248 L622 278 Z"/>
              </g>
              <g stroke-width="1.1">
                <path d="M538 214 L538 202 M572 232 L572 222 M602 248 L602 240"/>
                <path d="M528 272 h12 v16 h-12 z M562 284 h12 v14 h-12 z M594 290 h12 v12 h-12 z"/>
              </g>
              <!-- gate towers (lower left) -->
              <g stroke-width="2.2">
                <path d="M40 246 L40 320 L88 320 L88 246"/>
                <path d="M34 246 Q64 214 94 246 Z"/>
              </g>
              <g stroke-width="1.2">
                <path d="M64 214 L64 202 M58 206 l6 -4 6 4"/>
                <path d="M50 270 h12 v16 h-12 z M68 270 h12 v16 h-12 z"/>
                <path d="M40 300 h48"/>
              </g>
              <g stroke-width="2">
                <path d="M100 230 L100 314 L136 314 L136 230"/>
                <path d="M94 230 L118 198 L142 230 Z"/>
              </g>
              <g stroke-width="1.2">
                <path d="M118 198 L118 188 M112 192 l6 -4 6 4"/>
                <path d="M108 252 h16 v20 h-16 z"/>
              </g>
              <!-- curtain wall / climbing rampart -->
              <g stroke-width="1.8">
                <path d="M136 300 L168 300"/>
                <path d="M88 300 L100 300"/>
                <path d="M150 300 L160 286 L176 276 L196 268 L214 256 L228 242 L240 230"/>
                <path d="M150 312 L160 298 L176 288 L196 280 L214 268 L228 254 L240 242"/>
              </g>
              <g stroke-width="1">
                <path d="M162 284 v-6 h6 v6 M180 274 v-6 h6 v6 M200 266 v-6 h6 v6 M218 254 v-6 h6 v6 M234 240 v-6 h6 v6"/>
                <path d="M168 292 l8 -4 M188 282 l8 -4 M208 272 l8 -4 M226 258 l8 -4"/>
              </g>
              <!-- wooded hill -->
              <g stroke-width="1.6">
                <path d="M20 330 q14 -22 34 -16 q10 -18 30 -12 q14 -16 34 -8 q16 -14 36 -6 q18 -12 38 -4 q20 -10 40 -2 q22 -8 44 0 q20 -8 42 -2 q22 -6 44 2 q24 -6 46 2 q22 -4 44 4 q24 -2 44 6 q18 -6 40 2 q18 -4 36 6 q16 2 34 10 q14 10 26 24 L640 360 L20 360 Z"/>
              </g>
              <g stroke-width="1.3">
                <path d="M70 358 q-14 -2 -16 -16 q-12 4 -16 -8 q-14 6 -10 18"/>
                <path d="M150 360 q-16 0 -18 -16 q-14 2 -16 -10 q-16 6 -10 20"/>
                <path d="M250 360 q-16 -2 -18 -16 q-12 2 -16 -8 q-16 6 -10 18"/>
                <path d="M360 360 q-18 0 -20 -16 q-14 2 -16 -10 q-16 6 -12 20"/>
                <path d="M470 360 q-16 -2 -18 -16 q-14 2 -16 -8 q-16 6 -10 18"/>
                <path d="M560 360 q-16 0 -18 -16 q-12 2 -16 -8 q-14 6 -10 18"/>
              </g>
            </g>
          </symbol>
        </defs>
      </svg>

      <!-- FAR layer: faint distant ranges, scattered top→bottom -->
      <svg
        ref="bgGrid"
        class="bg-layer bg-far"
        viewBox="0 0 800 2400"
        preserveAspectRatio="xMidYMin slice"
      >
        <g stroke="var(--map-line)" stroke-width="1.4" fill="none" stroke-linejoin="round" stroke-linecap="round">
          <use href="#mtn" x="40" y="120" transform="scale(1.1)" />
          <use href="#mtn" x="560" y="80" />
          <use href="#hill" x="300" y="220" />
          <use href="#mtn" x="80" y="640" />
          <use href="#hill" x="600" y="560" transform="scale(1.2)" />
          <use href="#mtn" x="420" y="900" transform="scale(0.9)" />
          <use href="#hill" x="120" y="1080" />
          <use href="#mtn" x="560" y="1180" transform="scale(1.15)" />
          <use href="#hill" x="320" y="1360" />
          <use href="#mtn" x="60" y="1560" />
          <use href="#hill" x="640" y="1640" />
          <use href="#mtn" x="380" y="1820" transform="scale(1.1)" />
          <use href="#hill" x="120" y="2040" />
          <use href="#mtn" x="560" y="2120" />
          <use href="#hill" x="340" y="2260" />
        </g>
      </svg>

      <!-- MID layer: forests, rivers, single peaks -->
      <svg
        ref="bgPeaks"
        class="bg-layer bg-mid"
        viewBox="0 0 800 2400"
        preserveAspectRatio="xMidYMin slice"
      >
        <!-- winding rivers threading the whole height -->
        <g stroke="var(--map-peak)" stroke-width="1.2" fill="none" stroke-linecap="round">
          <path d="M120 -20 Q60 240 180 420 Q280 580 160 820 Q60 1040 200 1240 Q320 1440 200 1700 Q120 1920 240 2160 Q300 2320 220 2420" stroke-opacity="0.5" />
          <path d="M680 -20 Q740 260 620 480 Q520 700 660 940 Q760 1140 640 1400 Q540 1640 680 1900 Q760 2120 640 2420" stroke-opacity="0.5" />
        </g>
        <g stroke="var(--map-peak)" stroke-width="1.3" fill="none" stroke-linejoin="round" stroke-linecap="round">
          <!-- pine clusters scattered -->
          <use href="#pine" x="320" y="160" /><use href="#pine" x="348" y="178" /><use href="#pine" x="300" y="190" />
          <use href="#pine" x="560" y="520" /><use href="#pine" x="588" y="540" /><use href="#pine" x="610" y="510" />
          <use href="#pine" x="160" y="760" /><use href="#pine" x="190" y="780" /><use href="#pine" x="140" y="792" />
          <use href="#pine" x="600" y="1080" /><use href="#pine" x="628" y="1100" />
          <use href="#pine" x="260" y="1300" /><use href="#pine" x="288" y="1318" /><use href="#pine" x="240" y="1330" />
          <use href="#pine" x="580" y="1560" /><use href="#pine" x="608" y="1580" /><use href="#pine" x="556" y="1592" />
          <use href="#pine" x="200" y="1840" /><use href="#pine" x="228" y="1860" />
          <use href="#pine" x="560" y="2080" /><use href="#pine" x="588" y="2098" /><use href="#pine" x="612" y="2070" />
          <use href="#pine" x="300" y="2260" /><use href="#pine" x="328" y="2278" />
          <!-- conical spires (image 2) -->
          <use href="#spire" x="420" y="380" transform="scale(0.9)" />
          <use href="#spire" x="120" y="1140" />
          <use href="#spire" x="540" y="1880" transform="scale(0.85)" />
        </g>
        <!-- flocks of birds drifting in the distance -->
        <g stroke="var(--map-peak)" stroke-width="1.4" fill="none" stroke-linecap="round">
          <use href="#bird" x="500" y="60" /><use href="#bird" x="524" y="72" /><use href="#bird" x="548" y="58" />
          <use href="#bird" x="90" y="440" /><use href="#bird" x="112" y="452" />
          <use href="#bird" x="660" y="740" /><use href="#bird" x="684" y="750" /><use href="#bird" x="706" y="736" />
          <use href="#bird" x="220" y="1000" /><use href="#bird" x="244" y="1012" />
          <use href="#bird" x="520" y="1440" /><use href="#bird" x="544" y="1452" /><use href="#bird" x="566" y="1438" />
          <use href="#bird" x="100" y="1720" /><use href="#bird" x="124" y="1732" />
          <use href="#bird" x="620" y="2160" /><use href="#bird" x="644" y="2172" /><use href="#bird" x="666" y="2158" />
        </g>
        <!-- windmills dotting the hillsides -->
        <g stroke="var(--map-peak)" stroke-linejoin="round" stroke-linecap="round">
          <use href="#windmill" x="500" y="220" width="70" height="94" class="windmill" />
          <use href="#windmill" x="140" y="1060" width="60" height="80" class="windmill" />
          <use href="#windmill" x="600" y="2060" width="65" height="86" class="windmill" />
        </g>
      </svg>

      <!-- NEAR layer: castles + floating sky-castle islands (most parallax) -->
      <svg
        ref="bgIslands"
        class="bg-layer bg-near"
        viewBox="0 0 800 2400"
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          <!-- #skycastle — floating island, hand-inked outline style.
               Symbol viewBox is tightened to the drawing's bounds (~600x560). -->
          <symbol id="skycastle" viewBox="100 80 600 560" overflow="visible">
            <g fill="none" stroke="var(--map-node)" stroke-linejoin="round" stroke-linecap="round">

              <!-- ============ TOP PLATEAU RIM (irregular, lumpy) ============ -->
              <g stroke-width="3">
                <path d="M120 330
                  C150 318 185 312 215 318
                  C235 305 268 300 295 308
                  C330 296 372 294 405 304
                  C440 295 482 296 512 306
                  C545 300 580 304 606 315
                  C636 312 666 320 686 334
                  C672 346 650 352 628 356
                  C600 366 565 372 532 370
                  C498 380 458 384 422 378
                  C385 388 342 388 308 380
                  C272 386 235 382 206 372
                  C176 370 146 360 128 348
                  C120 342 116 336 120 330 Z"/>
              </g>

              <!-- ============ THREE MAIN PEAKS ============ -->
              <g stroke-width="3">
                <!-- left peak -->
                <path d="M218 318 L262 212 L286 246 L308 188 L342 252 L362 306"/>
                <!-- center (tallest) peak -->
                <path d="M340 300 L392 150 L416 196 L448 96 L486 190 L506 152 L548 296"/>
                <!-- right peak -->
                <path d="M530 300 L574 200 L596 238 L626 176 L660 268 L676 320"/>
              </g>

              <!-- ridge lines / facets on peaks -->
              <g stroke-width="1.6">
                <path d="M308 188 L316 250 L330 300"/>
                <path d="M286 246 L296 290 L300 322"/>
                <path d="M262 212 L256 268 L244 312"/>
                <path d="M448 96 L452 180 L460 250 L470 310"/>
                <path d="M416 196 L420 252 L414 312"/>
                <path d="M392 150 L380 220 L368 286"/>
                <path d="M486 190 L496 250 L508 308"/>
                <path d="M626 176 L628 240 L634 300"/>
                <path d="M596 238 L592 288 L588 318"/>
                <path d="M574 200 L566 256 L556 300"/>
              </g>

              <!-- small hatch strokes on slopes -->
              <g stroke-width="1.1">
                <path d="M276 262 l10 14 M252 286 l9 12 M324 232 l9 14 M338 276 l8 12"/>
                <path d="M404 232 l10 16 M432 168 l9 14 M468 216 l10 16 M492 262 l9 14 M438 280 l9 14"/>
                <path d="M584 252 l9 13 M612 230 l9 14 M644 280 l8 12 M560 280 l8 12"/>
              </g>

              <!-- dashed lines: backs of the peaks on the far side -->
              <g stroke-width="1.1" stroke-dasharray="5 6">
                <path d="M262 212 L300 252 L342 252"/>
                <path d="M448 96 L500 178 L548 296"/>
                <path d="M308 188 L350 236"/>
                <path d="M626 176 L662 240"/>
              </g>

              <!-- ============ PLATEAU SURFACE DETAIL ============ -->
              <g stroke-width="1.3">
                <!-- winding path / river -->
                <path d="M212 352 C260 348 290 360 330 356 C372 350 400 362 446 358 C490 352 520 364 566 356"/>
                <!-- rocks and scrub -->
                <path d="M250 344 l8 -8 8 8 M268 348 l5 -5 5 5"/>
                <path d="M470 346 l9 -9 9 9 M492 350 l6 -6 6 6"/>
                <path d="M380 366 q6 -8 12 0 M398 370 q5 -6 10 0"/>
              </g>

              <!-- pine clusters (left ledge) -->
              <g stroke-width="1.4">
                <path d="M156 328 l6 -16 6 16 m-9 -8 l3 -9 3 9"/>
                <path d="M174 332 l7 -20 7 20 m-11 -10 l4 -11 4 11"/>
                <path d="M196 330 l6 -15 6 15"/>
                <path d="M140 336 l5 -12 5 12"/>
              </g>
              <!-- pine clusters (right ledge) -->
              <g stroke-width="1.4">
                <path d="M598 332 l6 -16 6 16 m-9 -8 l3 -9 3 9"/>
                <path d="M618 336 l7 -19 7 19"/>
                <path d="M580 336 l5 -13 5 13"/>
                <path d="M640 340 l5 -12 5 12"/>
              </g>
              <!-- small pines near center -->
              <g stroke-width="1.3">
                <path d="M352 338 l5 -13 5 13 M366 342 l4 -10 4 10"/>
              </g>

              <!-- ============ UNDERSIDE: hanging rock spikes ============ -->
              <g stroke-width="3">
                <path d="M128 348
                  C140 372 150 398 146 428 L170 402 L186 452 L208 416
                  L224 488 L252 438 L270 530 L300 462
                  L322 560 L352 488 L378 612 L410 506
                  L432 586 L458 498 L482 552 L506 472
                  L534 540 L560 452 L582 500 L604 420
                  L626 458 L644 396 L662 420 L676 360"/>
              </g>

              <!-- vertical strata / cracks on the rock face -->
              <g stroke-width="1.5">
                <path d="M188 384 L196 432"/>
                <path d="M238 396 L250 470"/>
                <path d="M286 412 L298 500"/>
                <path d="M336 430 L350 540"/>
                <path d="M388 446 L398 560"/>
                <path d="M440 440 L450 540"/>
                <path d="M494 420 L506 500"/>
                <path d="M548 404 L558 470"/>
                <path d="M598 380 L606 432"/>
                <path d="M648 366 L652 404"/>
              </g>

              <!-- horizontal sediment layers, broken -->
              <g stroke-width="1.2">
                <path d="M150 380 q40 10 86 14 M260 400 q44 10 90 14 M376 422 q42 8 84 8"/>
                <path d="M480 420 q44 -6 86 -14 M586 398 q38 -10 72 -20"/>
                <path d="M176 416 q36 10 70 14 M276 442 q40 10 78 12 M380 470 q36 6 70 4"/>
                <path d="M474 462 q40 -8 76 -16 M572 432 q34 -10 62 -18"/>
                <path d="M250 490 q30 8 58 8 M340 520 q26 4 50 2 M430 510 q28 -4 54 -10"/>
                <path d="M312 548 q20 4 38 2 M396 566 q18 0 34 -4"/>
              </g>

              <!-- short break/hatch marks in the rock -->
              <g stroke-width="1">
                <path d="M210 430 l12 4 M232 460 l11 5 M300 470 l12 4 M268 506 l10 4"/>
                <path d="M356 510 l12 3 M386 540 l11 2 M420 540 l11 -2 M462 510 l12 -4"/>
                <path d="M516 488 l12 -4 M552 470 l11 -5 M590 440 l11 -5 M624 408 l10 -5"/>
                <path d="M168 396 l11 4 M154 414 l10 4"/>
              </g>

              <!-- dashed back edge of underside -->
              <g stroke-width="1" stroke-dasharray="4 6">
                <path d="M676 360 C660 410 630 450 596 472"/>
                <path d="M378 612 C360 580 348 556 344 540"/>
              </g>

              <!-- drifting rock debris below -->
              <g stroke-width="1.6">
                <path d="M286 612 l14 -10 16 6 -6 14 -16 2 z"/>
                <path d="M470 632 l10 -8 13 4 -3 12 -13 3 z"/>
                <path d="M560 586 l8 -6 10 3 -2 9 -10 3 z"/>
                <path d="M196 540 l7 -6 9 3 -2 9 -9 2 z"/>
              </g>

              <!-- ============ ancient ruin pillars on the plateau ============ -->
              <g stroke-width="1.5">
                <path d="M262 340 v-30 M262 310 h-6 M262 310 h6"/>
                <path d="M280 344 v-22 M280 322 h-5 M280 322 h5"/>
                <path d="M420 348 v-34 M420 314 h-7 M420 314 h7 M420 330 h-6 M420 330 h6"/>
                <path d="M300 348 L318 336" stroke-dasharray="2 4"/>
              </g>

              <!-- ============ mist wisps around the underside, reinforcing the floating feel ============ -->
              <g stroke-width="1.1" stroke-opacity="0.55">
                <path d="M96 420 q18 8 36 0 q18 8 36 0"/>
                <path d="M60 470 q20 9 40 0 q20 9 40 0"/>
                <path d="M560 440 q18 8 36 0 q18 8 36 0"/>
                <path d="M600 490 q20 9 40 0 q20 9 40 0"/>
                <path d="M300 560 q22 9 44 0 q22 9 44 0"/>
              </g>

              <!-- ============ WATERFALL off the left ledge ============ -->
              <g stroke-width="1.3" stroke-dasharray="3 4">
                <path d="M182 372 C178 400 184 428 176 456 C170 480 178 504 172 528"/>
                <path d="M196 378 C192 404 198 430 190 456 C186 478 192 500 186 522"/>
              </g>
              <g stroke-width="1">
                <path d="M164 534 q8 -4 16 0 M172 544 q8 -4 16 0"/>
                <circle cx="168" cy="538" r="1.6" fill="var(--map-node)" stroke="none"/>
                <circle cx="188" cy="528" r="1.3" fill="var(--map-node)" stroke="none"/>
                <circle cx="178" cy="552" r="1.4" fill="var(--map-node)" stroke="none"/>
              </g>

              <!-- ============ birds circling the island ============ -->
              <g stroke-width="1.4" class="skycastle-birds">
                <path d="M120 200 q8 -8 16 0 q8 -8 16 0"/>
                <path d="M560 160 q7 -7 14 0 q7 -7 14 0"/>
                <path d="M660 260 q6 -6 12 0 q6 -6 12 0"/>
              </g>
            </g>
          </symbol>
        </defs>

        <g stroke="var(--map-node)" stroke-width="1.3" fill="none" stroke-linejoin="round" stroke-linecap="round">
          <!-- ground castles (image 1) — symbol is 640x420, ~260px wide -->
          <use href="#castle" x="60" y="200" width="260" height="171" />
          <use href="#castle" x="460" y="860" width="220" height="144" />
          <use href="#castle" x="80" y="1660" width="240" height="158" />
        </g>
        <!-- floating sky-islands (image 3) drift independently.
             width/height scale the 600x560 symbol; ~200-260px wide looks right. -->
        <g class="float-a"><use href="#skycastle" x="480" y="60" width="260" height="243" /></g>
        <g class="float-b"><use href="#skycastle" x="80" y="600" width="210" height="196" /></g>
        <g class="float-c"><use href="#skycastle" x="500" y="1380" width="240" height="224" /></g>
        <g class="float-a"><use href="#skycastle" x="160" y="2000" width="220" height="206" /></g>

        <!-- hot air balloons, drifting -->
        <g stroke="var(--map-node)" fill="none">
          <g class="float-b"><use href="#balloon" x="640" y="420" width="40" height="64" /></g>
          <g class="float-c"><use href="#balloon" x="60" y="1180" width="34" height="54" /></g>
          <g class="float-a"><use href="#balloon" x="700" y="1740" width="38" height="60" /></g>
        </g>

        <!-- faint glowing magic runes along the path -->
        <g stroke="var(--map-node)" fill="none" color="var(--map-node)">
          <use href="#rune" x="230" y="500" width="26" height="26" class="rune" />
          <use href="#rune" x="540" y="1060" width="22" height="22" class="rune" />
          <use href="#rune" x="150" y="1560" width="24" height="24" class="rune" />
          <use href="#rune" x="600" y="2200" width="20" height="20" class="rune" />
        </g>
      </svg>
    </div>

    <header class="journey-head">
      <p class="journey-eyebrow">The Quest Log</p>
      <h2 class="journey-title font-display">My Journey</h2>
      <p class="journey-sub">
        Each checkpoint is a chapter — scroll to walk the path from where it
        started to where it's heading.
      </p>
    </header>

    <div ref="map" class="journey-map">
      <!-- Trail spine -->
      <div class="trail" aria-hidden="true">
        <div class="trail-base" />
        <div class="trail-footprints" />
        <div ref="trailFill" class="trail-fill" />
      </div>

      <!-- Start flag -->
      <div class="checkpoint checkpoint--flag">
        <span class="flag">🚩</span>
        <span class="flag-label">Start</span>
      </div>

      <!-- Milestones -->
      <div
        v-for="(exp, index) in experiences"
        :key="index"
        :ref="setStepRef"
        class="step"
        :class="index % 2 === 0 ? 'step--left' : 'step--right'"
      >
        <!-- Level node -->
        <div class="node">
          <span class="node-level">Lv.{{ index + 1 }}</span>
          <div class="node-badge">
            <img :src="exp.icon" :alt="exp.title + ' icon'" class="node-icon" >
          </div>
        </div>

        <!-- Card -->
        <div
          class="card"
          :class="exp.image ? 'card--clickable' : ''"
          :role="exp.image ? 'button' : undefined"
          :tabindex="exp.image ? 0 : undefined"
          @click="exp.image && openModal(exp.image)"
          @keydown.enter="exp.image && openModal(exp.image)"
        >
          <div v-if="exp.image" class="card-photo-hint" title="View proof">
            <Camera class="w-4 h-4" />
          </div>
          <h3 class="card-title">{{ exp.title }}</h3>
          <h4 class="card-subtitle">{{ exp.subtitle }}</h4>
          <p class="card-desc">{{ exp.description }}</p>
        </div>
      </div>

      <!-- Finish flag -->
      <div class="checkpoint checkpoint--flag checkpoint--finish">
        <span class="flag">🏆</span>
        <span class="flag-label">To be continued…</span>
      </div>
    </div>

    <!-- Image modal — Teleport ensures fixed covers full viewport -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showModal"
          class="modal-overlay"
          @click.self="closeModal"
        >
          <div class="modal-frame">
            <button class="modal-close" aria-label="Close" @click="closeModal">
              <X class="w-5 h-5" />
            </button>
            <div class="modal-inner">
              <img :src="selectedImage" alt="Experience proof" class="modal-img" >
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUpdate, computed, type ComponentPublicInstance } from "vue";
import { experiences as rawExperiences } from "~/data/experience";
const experiences = computed(() => [...rawExperiences].reverse());
import { Camera, X } from "lucide-vue-next";
import { gsap } from "gsap";

const showModal = ref(false);
const selectedImage = ref("");

const root = ref<HTMLElement | null>(null);
const map = ref<HTMLElement | null>(null);
const trailFill = ref<HTMLElement | null>(null);
const stepRefs = ref<HTMLElement[]>([]);

// parallax background layers
const bg = ref<HTMLElement | null>(null);
const bgGrid = ref<SVGElement | null>(null);
const bgPeaks = ref<SVGElement | null>(null);
const bgIslands = ref<SVGElement | null>(null);

// reset refs before each re-render so we don't accumulate stale nodes
onBeforeUpdate(() => {
  stepRefs.value = [];
});
const setStepRef = (el: Element | ComponentPublicInstance | null) => {
  if (el && el instanceof Element) stepRefs.value.push(el as HTMLElement);
};

const openModal = (image: string) => {
  selectedImage.value = image;
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
  selectedImage.value = "";
};

onMounted(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !map.value) {
    // Without motion, just show everything.
    if (trailFill.value) trailFill.value.style.height = "100%";
    return;
  }

  const ctx = gsap.context(() => {
    // --- Parallax fantasy-map background ---
    // Each layer scrolls a different distance for depth.
    const parallax = (el: SVGElement | null, yMove: number) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { yPercent: -yMove },
        {
          yPercent: yMove,
          ease: "none",
          scrollTrigger: {
            trigger: root.value,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    };
    parallax(bgGrid.value, 4);     // far — slowest
    parallax(bgPeaks.value, 9);    // mid
    parallax(bgIslands.value, 16); // near — fastest

    // Per-layer breathing fade so the layers cross-dissolve in and out.
    gsap.to(bgGrid.value, {
      opacity: 0.22, duration: 4.5, ease: "sine.inOut", repeat: -1, yoyo: true,
    });
    gsap.to(bgPeaks.value, {
      opacity: 0.4, duration: 6, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.8,
    });
    gsap.to(bgIslands.value, {
      opacity: 0.5, duration: 5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.6,
    });

    // Subtle endless drift of the floating sky-castles (depth + life).
    gsap.utils.toArray<HTMLElement>(".float-a").forEach((el) => {
      gsap.to(el, { y: -10, x: 6, duration: 6, ease: "sine.inOut", repeat: -1, yoyo: true });
    });
    gsap.utils.toArray<HTMLElement>(".float-b").forEach((el) => {
      gsap.to(el, { y: 12, x: -8, duration: 7, ease: "sine.inOut", repeat: -1, yoyo: true });
    });
    gsap.utils.toArray<HTMLElement>(".float-c").forEach((el) => {
      gsap.to(el, { y: -14, duration: 5, ease: "sine.inOut", repeat: -1, yoyo: true });
    });

    // Trail fills as you progress through the section.
    gsap.fromTo(
      trailFill.value,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: map.value,
          start: "top 60%",
          end: "bottom 70%",
          scrub: 0.6,
        },
      }
    );

    // Reveal each step + light up its node when reached.
    stepRefs.value.forEach((step) => {
      const node = step.querySelector(".node-badge");
      const card = step.querySelector(".card");
      const fromX = step.classList.contains("step--left") ? -40 : 40;

      gsap.fromTo(
        card,
        { x: fromX, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 80%" },
        }
      );

      gsap.fromTo(
        node,
        { scale: 0.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: step,
            start: "top 78%",
            onEnter: () => node?.classList.add("node-badge--reached"),
            onLeaveBack: () => node?.classList.remove("node-badge--reached"),
          },
        }
      );
    });
  }, root.value!);

  return () => ctx.revert();
});
</script>

<style scoped>
.journey {
  --accent: #6366f1;
  --accent-2: #22d3ee;
  /* 3D map backdrop palette (light) */
  --map-line: rgba(99, 102, 241, 0.18);
  --map-peak: rgba(99, 102, 241, 0.28);
  --map-node: rgba(34, 211, 238, 0.4);
  --map-fill: rgba(99, 102, 241, 0.5);
  position: relative;
  padding-top: 1rem;
  padding-bottom: 2rem;
  overflow: hidden;
}
:global(.dark) .journey {
  --map-line: rgba(129, 140, 248, 0.22);
  --map-peak: rgba(129, 140, 248, 0.4);
  --map-node: rgba(34, 211, 238, 0.55);
  --map-fill: rgba(129, 140, 248, 0.55);
}

/* ---------- parallax fantasy-map background ---------- */
.journey-bg {
  position: absolute;
  inset: -5% 0 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.5;
  /* fade toward the centre column so text stays readable */
  -webkit-mask-image: radial-gradient(ellipse 92% 100% at 50% 50%, transparent 8%, #000 38%, #000 75%, transparent 100%);
  mask-image: radial-gradient(ellipse 92% 100% at 50% 50%, transparent 8%, #000 38%, #000 75%, transparent 100%);
}
.bg-layer {
  position: absolute;
  left: 50%;
  top: 0;
  width: 116%;
  height: 116%;
  transform: translateX(-50%);
  will-change: transform, opacity;
}
.bg-far { opacity: 0.5; }
.bg-mid { opacity: 0.7; }
.bg-near { opacity: 0.85; }

.skycastle-birds path {
  transform-box: fill-box;
  transform-origin: center;
  animation: skycastle-flap 2.4s ease-in-out infinite;
}
.skycastle-birds path:nth-child(2) { animation-duration: 2s; animation-delay: 0.3s; }
.skycastle-birds path:nth-child(3) { animation-duration: 2.6s; animation-delay: 0.6s; }
@keyframes skycastle-flap {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.45); }
}

/* keep all real content above the backdrop */
.journey-head,
.journey-map { position: relative; z-index: 1; }

/* windmill sails spinning slowly */
.windmill-sails { animation: windmill-spin 8s linear infinite; transform-box: fill-box; }
@keyframes windmill-spin { to { transform: rotate(360deg); } }

/* magic runes pulsing with a faint glow */
.rune-glow { animation: rune-pulse 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes rune-pulse {
  0%, 100% { opacity: 0.35; filter: drop-shadow(0 0 0 currentColor); }
  50% { opacity: 0.9; filter: drop-shadow(0 0 4px currentColor); }
}


/* ---------- header ---------- */
.journey-head {
  text-align: center;
  max-width: 40rem;
  margin: 0 auto 4rem;
}
.journey-eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--accent);
}
.journey-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-top: 0.5rem;
}
.journey-sub {
  margin-top: 0.75rem;
  color: #64748b;
  line-height: 1.6;
}
:global(.dark) .journey-sub { color: #94a3b8; }

/* ---------- map / trail ---------- */
.journey-map {
  position: relative;
  padding: 1rem 0 0;
}
.trail {
  position: absolute;
  top: calc(1rem + 44px);
  bottom: calc(2.5rem + 22px);
  left: 28px;
  width: 4px;
}
.trail-base,
.trail-fill {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  border-radius: 9999px;
}
.trail-base {
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(100, 116, 139, 0.28) 0,
    rgba(100, 116, 139, 0.28) 8px,
    transparent 8px,
    transparent 16px
  );
  background-size: 100% 16px;
}
.trail-fill {
  height: 0%;
  background: linear-gradient(to bottom, var(--accent), var(--accent-2));
  box-shadow: 0 0 14px rgba(99, 102, 241, 0.55);
}

/* footprint trail — a repeating pair of left/right footprints, toes pointing down (start → finish) */
.trail-footprints {
  position: absolute;
  top: 0;
  left: 50%;
  width: 24px;
  height: 100%;
  transform: translateX(-50%);
  background-color: rgba(100, 116, 139, 0.45);
  -webkit-mask-repeat: repeat-y;
  mask-repeat: repeat-y;
  -webkit-mask-position: top center;
  mask-position: top center;
  -webkit-mask-size: 24px 44px;
  mask-size: 24px 44px;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='44'%3E%3Cg transform='translate(3,2) rotate(-8 4 7)'%3E%3Ccircle cx='4' cy='2' r='2'/%3E%3Cellipse cx='4' cy='8.4' rx='3' ry='4.6'/%3E%3C/g%3E%3Cg transform='translate(13,24) rotate(8 4 7)'%3E%3Ccircle cx='4' cy='2' r='2'/%3E%3Cellipse cx='4' cy='8.4' rx='3' ry='4.6'/%3E%3C/g%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='44'%3E%3Cg transform='translate(3,2) rotate(-8 4 7)'%3E%3Ccircle cx='4' cy='2' r='2'/%3E%3Cellipse cx='4' cy='8.4' rx='3' ry='4.6'/%3E%3C/g%3E%3Cg transform='translate(13,24) rotate(8 4 7)'%3E%3Ccircle cx='4' cy='2' r='2'/%3E%3Cellipse cx='4' cy='8.4' rx='3' ry='4.6'/%3E%3C/g%3E%3C/svg%3E");
}
:global(.dark) .trail-footprints { background-color: rgba(148, 163, 184, 0.4); }

/* ---------- checkpoints / flags ---------- */
.checkpoint--flag {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-left: 8px;
  margin-bottom: 2.5rem;
}
.checkpoint--finish { margin-top: 2.5rem; margin-bottom: 2rem; }
.flag {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
  background: #fff;
  border: 2px solid var(--accent);
  border-radius: 9999px;
  box-shadow: 0 8px 20px -10px rgba(99, 102, 241, 0.6);
}
:global(.dark) .flag { background: #0f172a; }
.flag-label {
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--accent);
}

/* ---------- steps ---------- */
.step {
  position: relative;
  padding-left: 76px;
  margin-bottom: 3rem;
}
.node {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  z-index: 2;
}
.node-level {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--accent);
  background: rgba(99, 102, 241, 0.12);
  border-radius: 9999px;
  padding: 1px 7px;
}
.node-badge {
  width: 58px;
  height: 58px;
  border-radius: 9999px;
  display: grid;
  place-items: center;
  background: #fff;
  border: 3px solid rgba(100, 116, 139, 0.3);
  box-shadow: 0 8px 18px -10px rgba(15, 23, 42, 0.35);
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.2s ease;
}
:global(.dark) .node-badge { background: #0f172a; }
.node-badge--reached {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.18),
    0 10px 24px -10px rgba(99, 102, 241, 0.7);
}
.node-icon { width: 30px; height: 30px; object-fit: contain; }

/* ---------- card ---------- */
.card {
  position: relative;
  background: #fff;
  border: 1px solid rgba(100, 116, 139, 0.15);
  border-radius: 1rem;
  padding: 1.4rem 1.5rem;
  box-shadow: 0 18px 40px -28px rgba(15, 23, 42, 0.5);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
:global(.dark) .card {
  background: #111827;
  border-color: rgba(148, 163, 184, 0.14);
}
.card--clickable { cursor: pointer; }
.card--clickable:hover {
  transform: translateY(-3px);
  border-color: var(--accent);
  box-shadow: 0 24px 50px -28px rgba(99, 102, 241, 0.6);
}
.card--clickable:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
.card-photo-hint {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  color: var(--accent);
  background: rgba(99, 102, 241, 0.1);
}
.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  padding-right: 2.5rem;
}
:global(.dark) .card-title { color: #f1f5f9; }
.card-subtitle {
  font-size: 0.85rem;
  color: var(--accent);
  font-weight: 600;
  margin-top: 0.15rem;
}
.card-desc {
  margin-top: 0.65rem;
  color: #475569;
  line-height: 1.65;
  font-size: 0.95rem;
}
:global(.dark) .card-desc { color: #cbd5e1; }

/* ---------- alternating layout (desktop) ---------- */
@media (min-width: 768px) {
  .trail { left: 50%; transform: translateX(-50%); top: calc(1rem + 56px); bottom: calc(2.5rem + 22px); }
  .checkpoint--flag {
    justify-content: center;
    padding-left: 0;
  }
  .step {
    padding-left: 0;
    display: grid;
    grid-template-columns: 1fr 116px 1fr;
    align-items: center;
    margin-bottom: 3.5rem;
  }
  .node {
    grid-column: 2;
    left: auto;
    position: relative;
    top: auto;
  }
  .step--left .card { grid-column: 1; text-align: right; }
  .step--left .card-title { padding-right: 0; padding-left: 2.5rem; }
  .step--left .card-photo-hint { right: auto; left: 1rem; }
  .step--right .card { grid-column: 3; }
}

/* ---------- modal ---------- */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(6px);
  padding: 1rem;
}
.modal-frame {
  position: relative;
  background: #fff;
  border-radius: 1rem;
  padding: 1.25rem;
  max-width: 48rem;
  width: 100%;
  box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.6);
}
:global(.dark) .modal-frame { background: #0f172a; }
.modal-close {
  position: absolute;
  top: -14px;
  right: -14px;
  background: #475569;
  color: #fff;
  border-radius: 0.7rem;
  padding: 0.5rem;
  box-shadow: 0 6px 16px -6px rgba(0, 0, 0, 0.5);
  transition: background 0.2s ease;
}
.modal-close:hover { background: #dc2626; }
.modal-inner {
  border: 1px solid rgba(100, 116, 139, 0.25);
  border-radius: 0.7rem;
  padding: 0.5rem;
  background: #f8fafc;
}
:global(.dark) .modal-inner { background: #1e293b; }
.modal-img {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 0.5rem;
}

.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>