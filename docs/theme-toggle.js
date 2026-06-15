(function () {
  var KEY = 'np-theme';
  var VERSION = 'v2'; // bump this to force-reset stored theme
  var VER_KEY = 'np-theme-version';

  // If stored version doesn't match, clear the theme preference and reset
  if (localStorage.getItem(VER_KEY) !== VERSION) {
    localStorage.removeItem(KEY);
    localStorage.setItem(VER_KEY, VERSION);
  }

  function getTheme() {
    var stored = localStorage.getItem(KEY);
    if (stored) return stored;
    return 'light'; // default is always light
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    updateButton(theme);
  }

  function updateButton(theme) {
    // Show what the user will switch TO, not what they're currently in
    var icon  = document.querySelector('.theme-toggle .toggle-icon');
    var label = document.querySelector('.theme-toggle .toggle-label');
    if (icon)  icon.textContent  = theme === 'dark' ? '☀' : '☾';
    if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
  }

  // Apply before paint to avoid flash
  applyTheme(getTheme());

  document.addEventListener('DOMContentLoaded', function () {
    // Re-apply in case DOMContentLoaded fires after early script runs
    applyTheme(getTheme());

    // Inject button into navbar
    var navRight = document.querySelector('.navbar-nav.ms-auto')
                || document.querySelector('.navbar-nav.navbar-nav-scroll')
                || document.querySelector('.navbar-nav');

    if (navRight && !document.querySelector('.theme-toggle')) {
      var li = document.createElement('li');
      li.className = 'nav-item d-flex align-items-center';
      li.innerHTML =
        '<button class="theme-toggle" aria-label="Toggle dark mode">' +
        '<span class="toggle-icon"></span>' +
        '<span class="toggle-label"></span>' +
        '</button>';
      navRight.appendChild(li);
      updateButton(getTheme());

      li.querySelector('.theme-toggle').addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(KEY, next);
        applyTheme(next);
      });
    }
  });
})();