/* ============================================================
   slides.js — 共用簡報控制
   功能：模式切換 (doc / slide)、鍵盤翻頁、自動縮放、列印
   ============================================================ */

(function () {
  const root = document.documentElement;
  const body = document.body;

  const SLIDE_W = 1920;
  const SLIDE_H = 1200;
  const PAD_DOC = 80;     // doc 模式 slide 兩側留白
  const PAD_SLIDE_H = 60; // slide 模式 水平留白
  const PAD_SLIDE_V = 80; // slide 模式 垂直留白（含 toolbar / nav）

  let current = 0;
  let hintTimer = null;

  function $all(sel) { return Array.from(document.querySelectorAll(sel)); }
  function slides() { return $all('.slide-wrap'); }

  function getMode() {
    return body.classList.contains('mode-slide') ? 'slide' : 'doc';
  }

  function setMode(mode) {
    body.classList.remove('mode-doc', 'mode-slide');
    body.classList.add('mode-' + mode);
    $all('.toolbar button[data-mode]').forEach(b => {
      b.classList.toggle('is-active', b.dataset.mode === mode);
    });
    updateScale();
    if (mode === 'slide') {
      showSlide(current);
      flashHint();
    }
    updateCounter();
  }

  function updateScale() {
    let scale;
    if (getMode() === 'slide') {
      const w = window.innerWidth - PAD_SLIDE_H * 2;
      const h = window.innerHeight - PAD_SLIDE_V * 2;
      scale = Math.min(w / SLIDE_W, h / SLIDE_H);
    } else {
      const w = window.innerWidth - PAD_DOC * 2;
      scale = Math.min(w / SLIDE_W, 1);
    }
    if (scale < 0.1) scale = 0.1;
    root.style.setProperty('--scale', scale.toFixed(4));
  }

  function showSlide(i) {
    const all = slides();
    if (all.length === 0) return;
    if (i < 0) i = 0;
    if (i >= all.length) i = all.length - 1;
    current = i;
    all.forEach((s, idx) => s.classList.toggle('is-active', idx === i));
    updateCounter();
  }

  function next() { showSlide(current + 1); }
  function prev() { showSlide(current - 1); }

  function updateCounter() {
    const total = slides().length;
    const txt = String(current + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
    $all('.counter').forEach(el => { el.textContent = txt; });
  }

  function flashHint() {
    const hint = document.querySelector('.kbd-hint');
    if (!hint) return;
    hint.classList.add('is-visible');
    hint.style.opacity = '1';
    if (hintTimer) clearTimeout(hintTimer);
    hintTimer = setTimeout(() => {
      hint.style.opacity = '0';
      setTimeout(() => hint.classList.remove('is-visible'), 400);
    }, 2400);
  }

  // 從 doc 模式點 slide 進入簡報模式 = 跳到那張
  function enterSlideAtIndex(i) {
    current = i;
    setMode('slide');
  }

  // === 初始化 ===
  document.addEventListener('DOMContentLoaded', () => {
    if (!body.classList.contains('mode-doc') && !body.classList.contains('mode-slide')) {
      body.classList.add('mode-doc');
    }
    updateScale();
    updateCounter();

    // doc 模式：點 slide 縮圖直接進入該頁簡報
    slides().forEach((s, idx) => {
      s.addEventListener('dblclick', () => {
        if (getMode() === 'doc') enterSlideAtIndex(idx);
      });
    });
  });

  window.addEventListener('resize', updateScale);

  // === 鍵盤 ===
  window.addEventListener('keydown', e => {
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (getMode() === 'slide') {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault(); next();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault(); prev();
      } else if (e.key === 'Home') {
        e.preventDefault(); showSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault(); showSlide(slides().length - 1);
      } else if (e.key === 'Escape') {
        e.preventDefault(); setMode('doc');
      }
    }

    if (e.key === 'p' || e.key === 'P') {
      e.preventDefault();
      setMode(getMode() === 'slide' ? 'doc' : 'slide');
    }
    if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen();
      }
    }
  });

  // === 工具列 ===
  document.addEventListener('click', e => {
    const btn = e.target.closest('button[data-action], button[data-mode]');
    if (!btn) return;
    if (btn.dataset.mode) setMode(btn.dataset.mode);
    if (btn.dataset.action === 'next') next();
    if (btn.dataset.action === 'prev') prev();
    if (btn.dataset.action === 'print') window.print();
    if (btn.dataset.action === 'fullscreen') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen();
      }
    }
  });
})();
