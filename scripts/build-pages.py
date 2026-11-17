from pathlib import Path
from math import sin, cos, pi
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
ASSETS = DIST / 'assets'

# All illustrations are original, scalable vector drawings. No remote asset requests.
def flower(color, variant=0):
    petals = 8 if variant != 1 else 12
    result = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><defs><radialGradient id="petal" cx="30%" cy="20%" r="90%"><stop stop-color="#fff6ff"/><stop offset=".3" stop-color="{color}"/><stop offset=".75" stop-color="{color}" stop-opacity=".8"/><stop offset="1" stop-color="#31223f"/></radialGradient><radialGradient id="heart" cx="30%" cy="25%"><stop stop-color="#f8ffd9"/><stop offset=".45" stop-color="#d4f78b"/><stop offset="1" stop-color="#728347"/></radialGradient></defs><g transform="translate(120 120)">'''
    if variant == 2:
        for i in range(5):
            result += f'<ellipse rx="92" ry="{25+i*4}" transform="rotate({i*36})" stroke="{color}" stroke-width="3" fill="none" opacity="{.5+i*.1}"/>'
    else:
        for i in range(petals):
            result += f'<ellipse cx="0" cy="-47" rx="{23 if variant == 0 else 13}" ry="{53 if variant == 0 else 60}" fill="url(#petal)" stroke="#ffffff44" stroke-width=".6" transform="rotate({i*360/petals})"/>'
    result += '<circle r="26" fill="url(#heart)"/><ellipse cx="-7" cy="-9" rx="10" ry="5" fill="#ffffff55" transform="rotate(-35)"/></g></svg>'
    return result
for name, color, variant in [('bloom','#bda0e8',0),('sun','#e7bd8e',1),('orbit','#b7dca7',2),('pink','#e8a9c8',0),('blue','#9bbcd9',1),('lilac','#bea1ed',2)]:
    (ASSETS/f'{name}.svg').write_text(flower(color,variant))

# A luminous botanical relay suspended over a wireframe island.
hero = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 730" fill="none"><defs>
<radialGradient id="halo"><stop stop-color="#80619f" stop-opacity=".25"/><stop offset="1" stop-color="#17151d" stop-opacity="0"/></radialGradient>
<linearGradient id="stem" x1="0" x2="1"><stop stop-color="#727e50"/><stop offset=".45" stop-color="#e5f7b1"/><stop offset="1" stop-color="#6e7854"/></linearGradient>
<radialGradient id="leaf" cx=".25" cy=".25" r=".85"><stop stop-color="#efffc9"/><stop offset=".4" stop-color="#badc88"/><stop offset="1" stop-color="#53694a"/></radialGradient>
<radialGradient id="petal" cx=".25" cy=".15" r=".9"><stop stop-color="#f4e9ff"/><stop offset=".32" stop-color="#c1a4ea"/><stop offset=".65" stop-color="#9974c4"/><stop offset="1" stop-color="#493255"/></radialGradient>
<radialGradient id="center" cx=".3" cy=".2" r=".8"><stop stop-color="#fbffd9"/><stop offset=".4" stop-color="#dcf7a6"/><stop offset="1" stop-color="#71864d"/></radialGradient>
<linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff0ff"/><stop offset=".3" stop-color="#9983b0"/><stop offset=".6" stop-color="#54435e"/><stop offset="1" stop-color="#c6afd9"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#bca1cf" stop-opacity=".12"/><stop offset="1" stop-color="#c0acd7" stop-opacity=".02"/></linearGradient>
<radialGradient id="ground"><stop stop-color="#a38abb" stop-opacity=".2"/><stop offset="1" stop-color="#a38abb" stop-opacity=".01"/></radialGradient>
</defs><ellipse cx="390" cy="380" rx="355" ry="325" fill="url(#halo)"/>
<g stroke="#b5a2c9" stroke-opacity=".12" stroke-width=".7">'''
for y in range(440,670,23):
    hero += f'<path d="M68 {y}H695"/>'
for x in range(45,740,50):
    hero += f'<path d="M380 380L{x} 680"/>'
hero += '''</g><ellipse cx="390" cy="565" rx="258" ry="90" fill="url(#ground)" stroke="#8b779e" stroke-opacity=".5"/><ellipse cx="390" cy="565" rx="238" ry="77" stroke="#8b779e" stroke-opacity=".3"/><ellipse cx="390" cy="580" rx="260" ry="88" stroke="#8b779e" stroke-opacity=".2"/>
<ellipse cx="390" cy="540" rx="184" ry="49" fill="#292532" stroke="url(#rim)"/>
<path d="M206 540V563C206 628 574 628 574 563V540" fill="#25212e" stroke="url(#rim)"/><ellipse cx="390" cy="563" rx="184" ry="49" fill="url(#glass)" stroke="#9a85b1" stroke-opacity=".3"/>
<ellipse cx="390" cy="540" rx="157" ry="36" stroke="#c6a5db" stroke-opacity=".25"/>
<path d="M148 466V275C148 78 638 78 638 275V466" fill="url(#glass)" stroke="url(#rim)" stroke-width="1.3"/>
<path d="M168 462V279C168 101 618 101 618 279V462" stroke="#ae9bc8" stroke-opacity=".18"/>
<ellipse cx="393" cy="458" rx="245" ry="96" stroke="url(#rim)" stroke-width="1"/>
<path d="M148 458C148 328 638 328 638 458" stroke="#d8c8ec" stroke-opacity=".2" stroke-dasharray="2 7"/>
<path d="M386 537C399 441 426 345 402 243" stroke="url(#stem)" stroke-width="9"/>
<path d="M397 449C362 424 320 405 289 368M410 374C446 357 465 330 488 310" stroke="url(#stem)" stroke-width="5"/>
<path d="M398 458C334 459 289 418 296 377C345 370 401 411 398 458Z" fill="url(#leaf)"/><path d="M398 458L303 386" stroke="#ecffc3" stroke-opacity=".45"/>
<path d="M410 374C415 319 452 292 492 296C497 345 456 374 410 374Z" fill="url(#leaf)"/><path d="M410 374L488 301" stroke="#ecffc3" stroke-opacity=".4"/>
<path d="M373 539C354 510 327 481 304 452" stroke="url(#stem)" stroke-width="4"/><path d="M375 539C384 506 409 485 432 483C438 509 413 534 375 539Z" fill="url(#leaf)"/>
<g transform="translate(400 251) rotate(-17) scale(1 .87)">'''
for i in range(9):
    hero += f'<ellipse cx="0" cy="-66" rx="34" ry="79" fill="url(#petal)" stroke="#f4deff" stroke-opacity=".35" stroke-width=".8" transform="rotate({i*40})"/>'
hero += '''<circle r="39" fill="url(#center)"/><ellipse cx="-12" cy="-14" rx="17" ry="8" transform="rotate(-20)" fill="#fffce9" fill-opacity=".45"/></g>
<g transform="translate(289 369) rotate(-32) scale(.37)">'''
for i in range(9):
    hero += f'<ellipse cx="0" cy="-66" rx="32" ry="79" fill="url(#petal)" stroke="#f4deff" stroke-opacity=".3" transform="rotate({i*40})"/>'
hero += '''<circle r="35" fill="url(#center)"/></g><g stroke="#d4f78b" stroke-opacity=".45"><path d="M179 255H238L277 293"/><path d="M520 403L574 367H685"/><path d="M270 566L230 616H142"/></g>
<g fill="#d4f78b"><circle cx="179" cy="255" r="4"/><circle cx="685" cy="367" r="4"/><circle cx="142" cy="616" r="4"/></g>
<g fill="#d3c4e1" font-family="monospace" font-size="9" letter-spacing="1"><text x="116" y="237">MEMORY / 001</text><text x="567" y="351">CARE / 003</text><text x="91" y="639">KNOWLEDGE / 002</text></g>
<g fill="#d4f78b"><circle cx="161" cy="424" r="2"/><circle cx="600" cy="219" r="2"/><circle cx="552" cy="129" r="1.5"/><circle cx="250" cy="108" r="1.5"/><circle cx="676" cy="499" r="2"/></g>
<g stroke="#e2c9ff" stroke-opacity=".6"><path d="M224 184H234M229 179V189M575 486H585M580 481V491M473 87H483M478 82V92"/></g></svg>'''
(ASSETS/'greenhouse.svg').write_text(hero)

brand = '<svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.5"><ellipse cx="32" cy="32" rx="28" ry="10"/><ellipse cx="32" cy="32" rx="28" ry="10" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="28" ry="10" transform="rotate(120 32 32)"/></g><circle cx="32" cy="32" r="4" fill="currentColor"/></svg>'
def header(active):
    links = ''.join(f'<a href="{file}"'+(' aria-current="page"' if key==active else '')+f'>{label}</a>' for key,file,label in [('home','index.html','The vision'),('garden','garden.html','The garden'),('agreement','agreement.html','Our agreement')])
    return f'<a class="skip" href="#main">Skip to content</a><header class="site-header wrap"><a class="brand" href="index.html" aria-label="Common Ground home">{brand}<span>common ground</span></a><nav class="nav" aria-label="Main navigation">{links}</nav><a class="nav-cta" href="garden.html#plant">Plant a seed <span aria-hidden="true">↗</span></a></header>'
def footer():
    return '<footer class="site-footer wrap"><div class="footer-meta"><span>Common Ground © 2086 · An imagined future.</span><span>A small experiment in a more human internet.</span></div><div class="footer-links"><a href="agreement.html">Made for belonging</a><button class="motion-button" type="button" aria-pressed="false">Motion: on</button><span class="micro">Take your time. Stay a while.</span></div></footer><div class="toast" role="status" aria-live="polite"></div>'
def page(title,active,content):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Step into Common Ground: a speculative internet in 2086 where communities grow shared knowledge, memory, and care.">
    <meta name="theme-color" content="#17151d">
    <title>{title} — Common Ground</title>
    <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="styles.css">
    <script src="app.js" defer></script>
</head>
<body data-page="{active}">
    {header(active)}
    {content}
    {footer()}
</body>
</html>
'''
home = '''<main id="main">
<section class="hero wrap" aria-labelledby="hero-title">
    <div class="hero-copy">
        <p class="eyebrow"><span class="dot"></span> Earth, 2086 · The next nature of the internet</p>
        <h1 id="hero-title">A future we<br>can grow<br><em>together.</em></h1>
        <p class="hero-description">What if going online felt like coming home?<br>Enter a living network of shared knowledge, small kindnesses, and human possibility.</p>
        <div class="hero-actions"><a class="button" href="garden.html">Enter the garden <span class="arrow" aria-hidden="true">↗</span></a><a class="text-link" href="#vision">Meet this future <span aria-hidden="true">↓</span></a></div>
    </div>
    <div class="hero-art"><img src="assets/greenhouse.svg" width="760" height="730" alt="A luminous lavender flower grows inside a transparent orbital greenhouse, linking memory, knowledge, and care."><span class="orbit-label micro">COMMUNITY RELAY / BOTANICAL INTERFACE 07</span><span class="art-tag micro">A living network. A shared beginning.</span></div>
</section>
<div class="world-strip wrap"><div class="coordinates micro"><span><span class="live-dot"></span> A speculative world</span><span>Locally rooted / openly connected</span></div><button class="sound-button" type="button" aria-pressed="false"><span class="sound-icon" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="sound-label">Soundscape off</span></button><span class="micro">Scroll to take root ↓</span></div>
<section class="intro-section wrap" id="vision" aria-labelledby="vision-title">
    <div class="section-label"><p class="eyebrow">01 / A different kind of connection</p></div>
    <div class="intro-copy"><h2 id="vision-title">The internet has become<br>a place we <em>care for.</em></h2><p>In 2086, community gardens are gateways to a planetary commons. Walk into a neighborhood greenhouse, or visit from your oldest screen. Both open the same world.</p><p>Here, a memory can become a flower. A skill can travel between cities. An invitation can make someone feel less alone. Each connection grows at the pace of the people tending it.</p><div class="principle-chips"><span>Owned by its communities</span><span>Open to quiet participation</span><span>Designed for belonging</span></div></div>
</section>
<section class="pathways" aria-labelledby="path-title"><div class="wrap">
    <div class="section-heading"><div><p class="eyebrow">Three things worth growing</p><h2 id="path-title">Small seeds. <em>Possible worlds.</em></h2></div><a class="text-link" href="garden.html">Explore the commons <span aria-hidden="true">↗</span></a></div>
    <div class="path-list">
        <article class="path-card"><div class="path-top"><span class="path-number">01 / KNOWLEDGE</span></div><img class="path-symbol" src="assets/bloom.svg" alt="" width="90" height="90" loading="lazy"><h3>What you know.</h3><p>A repair trick. A recipe. A new way of seeing. Everyday knowledge becomes a resource everyone can reach.</p><a class="text-link" href="garden.html?type=knowledge">Find a little wisdom <span aria-hidden="true">↗</span></a></article>
        <article class="path-card"><div class="path-top"><span class="path-number">02 / MEMORY</span></div><img class="path-symbol" src="assets/pink.svg" alt="" width="90" height="90" loading="lazy"><h3>What you carry.</h3><p>The sound of a street. A grandmother’s words. A place that changed. Personal histories find room to live on.</p><a class="text-link" href="garden.html?type=memory">Wander through memories <span aria-hidden="true">↗</span></a></article>
        <article class="path-card"><div class="path-top"><span class="path-number">03 / CARE</span></div><img class="path-symbol" src="assets/orbit.svg" alt="" width="90" height="90" loading="lazy"><h3>What we can give.</h3><p>Time, company, or a hand getting started. Asking and offering sit side by side. Everyone has a place here.</p><a class="text-link" href="garden.html?type=care">Discover an invitation <span aria-hidden="true">↗</span></a></article>
    </div>
</div></section>
<section class="invitation wrap"><div><p class="eyebrow">You don’t have to be extraordinary.</p><h2>Just bring <em>yourself.</em></h2></div><a class="button" href="garden.html#plant">Plant your first seed <span class="arrow" aria-hidden="true">↗</span></a></section>
</main>'''
(DIST/'index.html').write_text(page('A future we can grow together','home',home))

garden = '''<main id="main" class="wrap">
<section class="page-intro"><div><p class="eyebrow"><span class="dot"></span> 02 / The community garden</p><h1>Every connection<br>starts with <em>a seed.</em></h1></div><p>Take a wandering path. Open something that calls to you. There is no right place to begin.</p></section>
<div class="garden-controls"><div class="filters" role="group" aria-label="Filter seeds"><button class="filter" type="button" data-filter="all" aria-pressed="true">Everything</button><button class="filter" type="button" data-filter="knowledge" aria-pressed="false">Knowledge</button><button class="filter" type="button" data-filter="memory" aria-pressed="false">Memory</button><button class="filter" type="button" data-filter="care" aria-pressed="false">Care</button><button class="filter" type="button" data-filter="pocket" aria-pressed="false">My pocket</button></div><span class="garden-note" id="seed-count" role="status" aria-live="polite">6 seeds to discover</span></div>
<p class="prototype-note">An imagined garden: the six founding seeds are fictional. Your seeds and pocket stay on this device. <a href="agreement.html#prototype">How this prototype works ↗</a></p>
<section class="seed-grid" id="seed-grid" aria-label="Community seeds"></section>
<noscript><p>This garden’s interactive seeds need JavaScript. You can still explore <a href="index.html">the vision</a> and <a href="agreement.html">our agreement</a>.</p></noscript>
<section class="plant-panel" id="plant"><div><p class="eyebrow">A small contribution is enough.</p><h2>What would you like to grow?</h2><p>Share a skill, leave a memory, or offer a little care.<br>Your seed will appear in your own version of this garden.</p></div><button class="button" id="plant-open" type="button">Plant a seed <span class="arrow" aria-hidden="true">+</span></button></section>
</main>
<dialog id="seed-dialog" aria-labelledby="detail-title"><div class="dialog-top"><p class="eyebrow" id="detail-type"></p><button class="close-dialog" type="button" aria-label="Close seed">×</button></div><img class="detail-art" id="detail-art" src="assets/bloom.svg" alt="" width="145" height="145"><h2 id="detail-title"></h2><p id="detail-person" class="micro"></p><p id="detail-body"></p><div class="detail-prompt"><h3 id="detail-prompt-title"></h3><p id="detail-prompt-body"></p></div><div class="detail-actions"><button class="button" type="button" id="pocket-button">Keep in my pocket +</button><button class="button secondary" type="button" id="remove-button" hidden>Remove my seed</button></div></dialog>
<dialog id="plant-dialog" aria-labelledby="plant-title"><div class="dialog-top"><p class="eyebrow">Your corner of the commons</p><button class="close-dialog" type="button" aria-label="Close planting form">×</button></div><h2 id="plant-title">Something small.<br><em>Something yours.</em></h2><p>A sentence is enough to begin.</p><form id="plant-form"><div class="form-row"><label>What are you planting?<select name="type"><option value="knowledge">A little knowledge</option><option value="memory">A memory</option><option value="care">An offer of care</option></select></label><label>Your name (optional)<input name="name" maxlength="30" placeholder="A neighbor" autocomplete="off"></label></div><label>Give your seed a name<input name="title" required maxlength="65" placeholder="e.g. How to mend a favorite sweater"></label><label>What would you like to share?<textarea name="body" required maxlength="700" placeholder="A thought, a story, or an invitation…"></textarea></label><p class="form-note" id="storage-note">Saved only in this browser, when storage is available. Nothing is sent to other people. You can remove your seed at any time.</p><button class="button" type="submit">Plant in my garden <span aria-hidden="true">↗</span></button><span class="form-status" role="status"></span></form></dialog>'''
(DIST/'garden.html').write_text(page('The community garden','garden',garden))

agreement = '''<main id="main">
<section class="manifesto-intro wrap"><div class="intro-left"><p class="eyebrow">03 / Our shared agreement</p><h1>The future belongs<br>to everyone <em>in it.</em></h1><p>Technology shapes who gets to participate. In this future, the people who tend the network also decide how it grows.</p><a class="text-link" href="#promises">Five promises to each other <span aria-hidden="true">↓</span></a></div><img class="manifesto-art" src="assets/orbit.svg" width="320" height="320" alt="Five luminous green orbits meet at one shared center."></section>
<section class="agreement-section" id="promises"><div class="agreement-layout wrap"><aside class="agreement-aside"><p class="eyebrow">The roots of this world</p><h2>Belonging is<br>a design choice.</h2><p>These are the rules of our imagined commons. They are promises to keep practicing, together.</p></aside><div class="agreements">
<details open><summary><span class="number">01</span>You are more than a profile.</summary><p>Use a name, a nickname, or no name. Browse without contributing. In the future commons, your relationships and memories are yours to keep, move, or erase.</p></details>
<details><summary><span class="number">02</span>Many ways in. Equal belonging.</summary><p>The imagined network can be entered through a public greenhouse, a screen reader, or an old phone. Text, sound, and touch offer different doorways. Community stewards help translate; no one has to surrender their language to be understood.</p></details>
<details><summary><span class="number">03</span>Care has no leaderboard.</summary><p>Asking for help is a contribution. Quiet presence counts, too. Seeds have no follower counts, popularity scores, or pressure to keep a streak. Community decisions must include people who have the least time to volunteer.</p></details>
<details><summary><span class="number">04</span>A commons needs caretakers.</summary><p>Residents choose paid stewards, publish the rules, and can appeal decisions. Consent is required before sharing another person’s story. Harm needs accountable responses; a beautiful interface alone cannot make a community safe.</p></details>
<details><summary><span class="number">05</span>Make room for the living world.</summary><p>Neighborhood relays use repairable hardware and share energy budgets openly. The future network rests when resources are scarce. Communities decide what stays available offline. Connection should leave room for life beyond the screen.</p></details>
</div></div></section>
<section class="timeline-section wrap"><p class="eyebrow">A speculative path from here to there</p><h2>A future doesn’t arrive. <em>We grow it.</em></h2><div class="timeline"><article class="era"><span class="year">2026</span><h3>Imagine a different default.</h3><p>Start with a question: what would the web feel like if belonging mattered more than attention?</p></article><article class="era"><span class="year">2045</span><h3>Bring the network home.</h3><p>In this imagined timeline, libraries and gardens become shared access points, stewarded by their neighborhoods.</p></article><article class="era"><span class="year">2086</span><h3>Let a thousand gardens connect.</h3><p>Local commons form a planetary network. Knowledge travels freely; communities retain a say in their own futures.</p></article></div></section>
<section class="research wrap" id="prototype"><h2>The dream.<br><em>The prototype.</em></h2><div class="research-content"><p>This is a speculative design, not a live community service. The people and founding seeds are fictional. Planting and pocketing work locally in your browser; they do not contact anyone. Hosting may involve ordinary server logs, but this project adds no tracking scripts.</p><p>Keyboard navigation, text alternatives, motion controls, and opt-in sound are part of this prototype. A real commons would also need participatory research, language support, paid moderation, and testing with disabled users. These are responsibilities still to carry forward.</p><p>The design takes inspiration from <a href="https://solar.lowtechmagazine.com/about/the-solar-website/">Low-tech Magazine’s lightweight solar website</a> and <a href="https://www.libraryofthings.co.uk/how-borrowing-works">Library of Things’ neighborhood sharing model</a>. Seed libraries and greenhouse architecture inform the visual world; all botanical illustrations are original SVG artwork.</p><p><a href="reflection.txt" download>Read the design reflection ↓</a></p></div></section>
<section class="invitation wrap"><div><p class="eyebrow">This world is an invitation.</p><h2>What will <em>you</em> grow?</h2></div><a class="button" href="garden.html">Return to the garden <span class="arrow" aria-hidden="true">↗</span></a></section>
</main>'''
(DIST/'agreement.html').write_text(page('Our shared agreement','agreement',agreement))
print('Created three linked pages and eight original SVG assets.')
