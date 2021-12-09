export default class TextBroadcast {
  constructor(server) {
    this.server = server;
    this.worklog = document.querySelector('.worklog-logging');
  }

  events() {
    this.addLog();
  }

  static eventSource(command) {
    const sse = new EventSource(`http://localhost:3333/sse${command}`);
    sse.addEventListener('comment', (ev) => {
      console.log(ev.data);
    });

    sse.addEventListener('open', () => {
      console.log('connected');
    });

    sse.addEventListener('error', () => {
      console.log('error');
    });
  }

  addLog(id, info = 'Recieved: "Load instance"') {
    const divLog = document.createElement('div');
    const spanDate = document.createElement('span');
    const spanServer = document.createElement('span');
    const spanInfo = document.createElement('span');
    spanDate.textContent = TextBroadcast.date();
    spanServer.textContent = `Server: ${id}`;
    spanInfo.textContent = `INFO: ${info}`;
    divLog.appendChild(spanDate);
    divLog.appendChild(spanServer);
    divLog.appendChild(spanInfo);
    divLog.classList.add('log');
    this.worklog.appendChild(divLog);
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
