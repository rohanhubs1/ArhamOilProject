import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Update stats animation
content = content.replace(
    '''statsContainer.innerHTML = data.quickStats.map((stat) => \
          <div class="spec-box-light flex items-center gap-2.5">''',
    '''statsContainer.innerHTML = data.quickStats.map((stat, idx) => \
          <div class="spec-box-light flex items-center gap-2.5 animate-reveal-fast" style="animation-delay: \ms; animation-fill-mode: both;">'''
)

# Update photos animation
content = content.replace(
    '''photosContainer.innerHTML = data.photos.map((p) => \
          <div class="photo-card-light h-24 flex-shrink-0 w-36 relative rounded-lg overflow-hidden group 
cursor-pointer" onclick="ArhamApp.openLightbox('\', '\')">'''.replace('\n', ''),
    '''photosContainer.innerHTML = data.photos.map((p, idx) => \
          <div class="photo-card-light h-28 flex-shrink-0 w-44 relative rounded-xl overflow-hidden group hover-zoom-container hover-glow cursor-pointer shadow-md animate-reveal-fast" style="animation-delay: \ms; animation-fill-mode: both;" onclick="ArhamApp.openLightbox('\', '\')">'''
)

# Title animation
content = content.replace(
    '''document.getElementById('robot-name').textContent = data.name;''',
    '''const nameEl = document.getElementById('robot-name');
      nameEl.textContent = data.name;
      nameEl.classList.remove('animate-reveal-fast');
      void nameEl.offsetWidth; // trigger reflow
      nameEl.classList.add('animate-reveal-fast');'''
)

# Update list items to animate
content = content.replace(
    '''<li class="flex items-start gap-2.5 text-xs text-[#334155]">''',
    '''<li class="flex items-start gap-2.5 text-xs text-[#334155] animate-reveal-fast" style="animation-delay: \ms; animation-fill-mode: both;">'''
)
content = content.replace(
    '''data.features.map(f => \''',
    '''data.features.map((f, idx) => \'''
)
content = content.replace(
    '''data.applications.map(a => \''',
    '''data.applications.map((a, idx) => \'''
)

# And for regular subtabs
content = content.replace(
    '''data.subtabs[this.currentSubtab].map((item) => \
                <div class="flex items-start justify-between border-b border-slate-100 pb-2 mb-2 last:border-0 last:pb-0 last:mb-0">''',
    '''data.subtabs[this.currentSubtab].map((item, idx) => \
                <div class="flex items-start justify-between border-b border-slate-100 pb-2 mb-2 last:border-0 last:pb-0 last:mb-0 animate-reveal-fast" style="animation-delay: \ms; animation-fill-mode: both;">'''
)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
