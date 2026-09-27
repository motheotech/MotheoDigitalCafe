/* Motheo Digital Cafe — Fix It Yourself console.
 * Depends on fix-data.js (DEVICES, FLOWS). No frameworks, no build step. */

(function () {
  'use strict';

  var root = document.getElementById('console');
  if (!root || typeof FLOWS === 'undefined') return;

  var WA = root.getAttribute('data-wa') || 'https://wa.me/27638763337';

  var state = { device: null, flow: null, step: 0, tried: [], view: 'devices' };

  /* ------------------------------------------------------------- helpers */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function flowsFor(deviceId) {
    return FLOWS.filter(function (f) { return f.device === deviceId; });
  }

  function deviceName(id) {
    var d = DEVICES.filter(function (x) { return x.id === id; })[0];
    return d ? d.name : id;
  }

  function trailHtml() {
    if (!state.tried.length) return '';
    var items = state.tried.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
    return '<div class="trail"><b>Already ruled out</b><ul>' + items + '</ul></div>';
  }

  function waLink() {
    var lines = ['Hi Motheo, I need help with my ' + deviceName(state.flow.device).toLowerCase() + '.'];
    lines.push('Problem: ' + state.flow.title + '.');
    if (state.tried.length) {
      lines.push('');
      lines.push('I already tried:');
      state.tried.forEach(function (t) { lines.push('- ' + t); });
    }
    lines.push('');
    lines.push('It is still not working.');
    return WA + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  function bar(label) {
    return '<div class="cons-bar">' +
      '<span class="cons-dot" aria-hidden="true"></span>' +
      '<span>' + esc(label) + '</span>' +
      '<span class="spacer"></span>' +
      (state.view === 'devices' ? '' :
        '<button type="button" class="cons-reset" data-act="reset">Start over</button>') +
      '</div>';
  }

  function extLink(f) {
    if (!f.ifixit) return '';
    return '<a class="cons-ext" href="' + esc(f.ifixit.url) + '" target="_blank" rel="noopener noreferrer">' +
      'Read more on iFixit: ' + esc(f.ifixit.label) + ' &#8599;</a>' +
      '<p class="cons-credit">iFixit is an independent repair community. ' +
      'Their guides are theirs, these steps are ours.</p>';
  }

  /* --------------------------------------------------------------- views */
  function viewDevices() {
    var chips = DEVICES.map(function (d) {
      var n = flowsFor(d.id).length;
      return '<button type="button" class="chip" data-act="device" data-id="' + d.id + '">' +
        '<b>' + esc(d.name) + '</b>' +
        '<small>' + esc(d.note) + ' &middot; ' + n + (n === 1 ? ' guide' : ' guides') + '</small>' +
        '</button>';
    }).join('');

    return bar('fix-it-yourself — ready') +
      '<div class="cons-body">' +
        '<p class="cons-q">What is giving you trouble?</p>' +
        '<p class="cons-hint">Free, takes a few minutes, and you keep whatever you learn. ' +
        'If it does not work you will know exactly what to tell us.</p>' +
        '<div class="chips">' + chips + '</div>' +
      '</div>';
  }

  function viewFlows() {
    var list = flowsFor(state.device);
    var chips = list.map(function (f) {
      return '<button type="button" class="chip" data-act="flow" data-id="' + f.id + '">' +
        '<b>' + esc(f.title) + '</b>' +
        '<small>' + esc(f.blurb) + ' &middot; ~' + f.mins + ' min</small>' +
        '</button>';
    }).join('');

    return bar(deviceName(state.device).toLowerCase() + ' — pick a symptom') +
      '<div class="cons-body">' +
        '<p class="cons-q">What is it doing?</p>' +
        '<p class="cons-hint">Choose the closest match. You can start over at any point.</p>' +
        '<div class="chips">' + chips + '</div>' +
        '<div class="cons-actions">' +
          '<button type="button" class="cbtn-back" data-act="devices">&larr; Different device</button>' +
        '</div>' +
      '</div>';
  }

  function viewStep() {
    var f = state.flow, s = f.steps[state.step];
    return bar(f.title.toLowerCase() + ' — step ' + (state.step + 1) + ' of ' + f.steps.length) +
      '<div class="cons-body">' +
        '<div class="cons-step">' +
          '<p class="cons-count">Step ' + (state.step + 1) + ' / ' + f.steps.length + '</p>' +
          '<p class="cons-q">' + esc(s.t) + '</p>' +
          '<p class="cons-do">' + esc(s.d) + '</p>' +
          (s.tip ? '<p class="cons-tip"><b>Note —</b> ' + esc(s.tip) + '</p>' : '') +
        '</div>' +
        '<div class="cons-actions">' +
          '<button type="button" class="cbtn cbtn-yes" data-act="fixed">That fixed it</button>' +
          '<button type="button" class="cbtn cbtn-no" data-act="next">Still broken</button>' +
          (state.step > 0 ? '<button type="button" class="cbtn-back" data-act="back">&larr; Back</button>' : '') +
        '</div>' +
        trailHtml() +
      '</div>';
  }

  function viewFixed() {
    var f = state.flow;
    return bar('resolved') +
      '<div class="cons-body outcome-good">' +
        '<p class="cons-q">Sorted. Nice one.</p>' +
        '<p class="cons-hint">You just saved yourself a callout. If it comes back, ' +
        'you already know which step it was — that is worth telling us.</p>' +
        '<div class="cons-actions">' +
          '<button type="button" class="cbtn cbtn-no" data-act="reset">Fix something else</button>' +
          '<a class="cbtn cbtn-yes" href="/prices/">See what we charge</a>' +
        '</div>' +
        extLink(f) +
      '</div>';
  }

  function viewStuck() {
    var f = state.flow;
    return bar('out of steps — bring it in') +
      '<div class="cons-body">' +
        '<p class="cons-q">That is as far as you can safely go.</p>' +
        '<p class="cons-do" style="font-family:var(--ui);color:rgba(255,255,255,.85);margin-bottom:1.2rem">' +
          esc(f.giveUp) + '</p>' +
        '<div class="cons-actions">' +
          '<a class="cbtn cbtn-yes" href="' + waLink() + '" target="_blank" rel="noopener noreferrer">' +
            'Send this to us on WhatsApp</a>' +
          '<a class="cbtn cbtn-no" href="/contact/">Book a repair</a>' +
          '<button type="button" class="cbtn-back" data-act="reset">Start over</button>' +
        '</div>' +
        '<p class="cons-credit" style="margin-top:1rem">The WhatsApp message is filled in for you, ' +
        'including every step you already tried, so nobody asks you to do it twice.</p>' +
        trailHtml() +
        extLink(f) +
      '</div>';
  }

  /* -------------------------------------------------------------- render */
  function render(focus) {
    var html;
    if (state.view === 'devices') html = viewDevices();
    else if (state.view === 'flows') html = viewFlows();
    else if (state.view === 'step') html = viewStep();
    else if (state.view === 'fixed') html = viewFixed();
    else html = viewStuck();

    root.innerHTML = html;

    if (focus) {
      var target = root.querySelector('.cons-body button, .cons-body a');
      if (target) target.focus();
    }
  }

  /* -------------------------------------------------------------- events */
  root.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.getAttribute('data-act');

    if (act === 'reset') {
      state = { device: null, flow: null, step: 0, tried: [], view: 'devices' };
    } else if (act === 'devices') {
      state.view = 'devices'; state.device = null; state.flow = null; state.tried = [];
    } else if (act === 'device') {
      state.device = el.getAttribute('data-id');
      state.view = 'flows';
    } else if (act === 'flow') {
      var id = el.getAttribute('data-id');
      state.flow = FLOWS.filter(function (f) { return f.id === id; })[0];
      state.step = 0; state.tried = []; state.view = 'step';
    } else if (act === 'fixed') {
      state.view = 'fixed';
    } else if (act === 'next') {
      state.tried.push(state.flow.steps[state.step].t);
      if (state.step + 1 < state.flow.steps.length) { state.step += 1; }
      else { state.view = 'stuck'; }
    } else if (act === 'back') {
      state.step = Math.max(0, state.step - 1);
      state.tried.pop();
    } else {
      return;
    }

    e.preventDefault();
    render(true);
  });

  render(false);
})();
