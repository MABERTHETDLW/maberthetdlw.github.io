var ajaxCall = (key, url, prompt_system, prompt_user, prompt_assistant) => {
  return new Promise((resolve, reject) => {
    $.ajax({ 
      url: url,
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
        "api-key": key,
        "Authorization": `{Bearer ${key}`,
      },
      "data": `{
        "messages": [
          {
            "role": "system",
            "content": "${prompt_system}"
          },
          {
            "role": "user",
            "content": "${prompt_user}"
          },
          {
            "role": "assistant",
            "content": "${prompt_assistant}"
          }
        ],
        "temperature": 0.7,
        "top_p": 0.95,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "max_tokens": 800,
        "stop": null
      }`,
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
    async post(apiKey, endpoint, prompt_system, prompt_user, prompt_assistant) {
      const { response } = await ajaxCall(
        apiKey,
        endpoint,
        prompt_system,
        prompt_user,
        prompt_assistant
      );
      console.log(response);
      const result = [response.choices[0].content, response.choices[0].id];  
      return result; 
    }
  }
  customElements.define("custom-widget", MainWebComponent);
})();
