
const count = document.querySelector('.count');
const people = document.querySelector('.people');
const textdetect = document.querySelector('.textdetect');
const channels = document.querySelector('.channels');
const addChannel = document.querySelector('#addChannel');
const info = document.querySelector('.info');
textdetect.value = "Enter a value";
addChannel.style.display = "none";

let channelsList = ["1zsg"];
const client = new tmi.Client({
	connection: {
		reconnect: true,
		secure: true
	},
	channels: channelsList
});

client.connect().catch(console.error);

let set = {};
client.on('message', (channel, tags, message, self) => {
    if(self) return;
    console.log(channel);
    if(message.includes(textdetect.value)) {
        set[tags.username] = true;
        count.textContent = Object.keys(set).length;
        people.textContent = Object.keys(set).join(', '); 
    }
    info.textContent = `Watching: ${channel}`;
});

textdetect.addEventListener('change', (e)=>{
    people.textContent = "";
    count.textContent = "";
    set = {};
});

channels.addEventListener('change', ()=>{
    addChannel.style.display = "block";
});

addChannel.addEventListener('click', ()=>{
    addChannel.style.display = "none";
    channelsList.push(channels.value);
    client.connect().catch(console.error);
});

function getViews(channelObj) {
    client.api({
        url: "/streams/" + channelObj
    }, function(err, res, body) {
        if (!err && res.statusCode === 200) {
            var body = JSON.parse(body);
            if (body.stream !== null) {
                return body.streams.viewers;
            } else {
                return "error: null body"
            }
        } else {
            return "error: twitch api is down."
        }
    });
}