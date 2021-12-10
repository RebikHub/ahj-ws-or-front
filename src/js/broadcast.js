export default class TextBroadcast {
  constructor() {
    this.sse = new EventSource('https://ahj-ws-or.herokuapp.com/sse');
    this.textlog = document.querySelector('.textlog-logging');
  }

  events() {
    this.eventSource();
  }

  eventSource() {
    this.sse.addEventListener('comment', (ev) => {
      const data = JSON.parse(ev.data);

      if (data.fullMatch) {
        this.fullMatch(data.fullMatch);
      } else if (data.events && data.events.text !== 'Матч завершился') {
        this.addLog(data.events);
      } else if (data.events.text === 'Матч завершился') {
        this.sse.close();
      }
    });

    this.sse.addEventListener('open', () => {
      console.log('connected');
    });

    this.sse.addEventListener('error', () => {
      console.log('error');
      this.sse.close();
    });
  }

  fullMatch(array) {
    for (let i = 0; i < array.length; i += 1) {
      this.addLog(array[i]);
    }
  }

  addLog(data) {
    const divLog = document.createElement('div');
    const divEvent = document.createElement('div');
    const spanDate = document.createElement('span');
    const spanImage = document.createElement('span');
    const spanText = document.createElement('span');
    spanDate.textContent = data.date;
    if (data.type === 'freekick') {
      spanImage.classList.add('freekick');
    } else if (data.type === 'goal') {
      spanImage.classList.add('goal');
    } else {
      spanImage.classList.add('action');
    }
    spanText.classList.add('text');
    divEvent.classList.add('event');
    spanText.textContent = data.text;
    divLog.appendChild(spanImage);
    divEvent.appendChild(spanDate);
    divEvent.appendChild(spanText);
    divLog.appendChild(divEvent);
    divLog.classList.add('log');
    this.textlog.appendChild(divLog);
    this.textlog.scrollTop = this.textlog.scrollHeight;
  }
}
