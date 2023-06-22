var ajaxCall = (key, url, prompt_system, prompt_user, prompt_assistant) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      method: "POST",
      timeout: 0,
      headers: {
        "api-key": key,
        Authorization: `Bearer ${key}`,
      },
  "data": `{
  "messages": [
    {
      "role": "system",
      "content": "You are an AI assistant that helps people find information."
    },
    {
      "role": "user",
      "content": ${prompt_user}
    },
    {
      "role": "assistant",
      "content": "En tant qu'IA, je ne peux pas accéder à cette information directement. Veuillez vérifier votre compte ou contacter le support de l'API que vous utilisez pour connaître votre quota API."
    }
  ],
  "temperature": 0.7,
  "top_p": 0.95,
  "frequency_penalty": 0,
  "presence_penalty": 0,
  "max_tokens": 800,
  "stop": null
}`,
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
      return response.choices.message.content;
    }
  }
  customElements.define("custom-widget", MainWebComponent);
})();
