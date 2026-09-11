document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  var iframe = document.getElementById('hidden_iframe');
  if (!form || !success || !iframe) return;

  var submitted = false;

  form.addEventListener('submit', function () {
    submitted = true;
  });

  // 隠しiframeの初回読み込み(about:blank)では反応せず、
  // フォーム送信後の読み込み完了時だけ成功表示に切り替える。
  // Google FormsはCORSでレスポンス内容を読めないため、この方式で判定する。
  iframe.addEventListener('load', function () {
    if (!submitted) return;
    form.hidden = true;
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});
