var ajaxCall = (key, url, prompt) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      method: "POST",
      timeout: 0,
      headers: {
        "api-key": key,
        Authorization: `Bearer ${key}`,
      },
      "data": prompt,
      success: function (response, status, xhr) {
        resolve({ response, status, xhr });
      },
      error: function (xhr, status, error) {
        const err = new Error('xhr error');
        err.status = xhr.status;
        reject(err);
      },
    });
  });
};


(function () {
  const template = document.createElement("template");
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;
  class MainWebComponent extends HTMLElement {
    async post(apiKey, endpoint, prompt) {
      const { response } = await ajaxCall(
        apiKey,
        endpoint,
        prompt
      );
      console.log(response);
      return response.choices[0].text;
    }
  }
  customElements.define("custom-widget", MainWebComponent);
})();
