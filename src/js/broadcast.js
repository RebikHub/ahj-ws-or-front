export default class TextBroadcast {
  constructor(server, sse) {
    this.server = server;
    this.sse = sse;
    this.textlog = document.querySelector('.textlog-logging');
  }

  events() {
    this.eventSource();
  }

  eventSource() {
    this.sse.addEventListener('comment', (ev) => {
      const { data } = ev;
      console.log(ev);
      this.addLog(data);
    });

    this.sse.addEventListener('open', () => {
      console.log('connected');
    });

    this.sse.addEventListener('error', () => {
      console.log('error');
    });
  }

  addLog(data) {
    const divLog = document.createElement('div');
    const spanDate = document.createElement('span');
    const spanImage = document.createElement('span');
    const spanText = document.createElement('span');
    spanDate.textContent = TextBroadcast.date();
    if (data.type === 'freekick') {
      spanImage.classList.add('freekick');
    } else if (data.type === 'goal') {
      spanImage.classList.add('goal');
    }
    spanText.textContent = data.text;
    divLog.appendChild(spanDate);
    divLog.appendChild(spanImage);
    divLog.appendChild(spanText);
    divLog.classList.add('log');
    this.textlog.appendChild(divLog);
    this.textlog.scrollTop = this.textlog.scrollHeight;
  }

  static date() {
    const year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let hours = new Date().getHours();
    let minute = new Date().getMinutes();
    let seconds = new Date().getSeconds();

    if (String(month).length === 1) {
      month = `0${month}`;
    }
    if (String(day).length === 1) {
      day = `0${day}`;
    }
    if (String(minute).length === 1) {
      minute = `0${minute}`;
    }
    if (String(seconds).length === 1) {
      seconds = `0${seconds}`;
    }
    if (String(hours).length === 1) {
      hours = `0${hours}`;
    }
    return `${hours}:${minute}:${seconds} ${day}.${month}.${String(year).slice(2)}`;
  }
}
