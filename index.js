const count = document.querySelector('.count');
const people = document.querySelector('.people');
const textdetect = document.querySelector('.textdetect');

const client = new tmi.Client({
	connection: {
		reconnect: true,
		secure: true
	},
	channels: [ 'serbanheroyt' ]
});
client.connect().catch(console.error);
let set = {};
textdetect.value = "Enter a value";
client.on('message', (channel, tags, message, self) => {
    if(self) return;
    
    if(message.includes(textdetect.value)) {
        set[tags.username] = true;
        count.textContent = Object.keys(set).length;
        people.textContent = Object.keys(set).join(', '); 
    }
});
textdetect.addEventListener('change', (e)=>{
    people.textContent = "";
    count.textContent = "";
    set = {};
});
		