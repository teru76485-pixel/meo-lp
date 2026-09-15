document.addEventListener('DOMContentLoaded', function () {
  function trackEvent(gaName, gaParams, fbName, fbParams) {
    if (typeof gtag === 'function') gtag('event', gaName, gaParams || {});
    if (typeof fbq === 'function' && fbName) fbq(fbName === 'Lead' ? 'track' : 'trackCustom', fbName, fbParams || {});
  }

  document.querySelectorAll('a[data-cta]').forEach(function (el) {
    el.addEventListener('click', function () {
      var location = el.getAttribute('data-cta');
      trackEvent('cta_click', { cta_location: location }, 'CTAClick', { location: location });
    });
  });

  // 予約カレンダー(iframe)は別ドメインのため、実際の予約完了はJSから検知できない。
  // 代わりに予約セクションへの到達を疑似的なLeadシグナルとして計測する。
  var diagnosisSection = document.getElementById('diagnosis');
  if (diagnosisSection && 'IntersectionObserver' in window) {
    var fired = false;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !fired) {
          fired = true;
          trackEvent('view_booking_section', {}, 'Lead', {});
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(diagnosisSection);
  }
});
