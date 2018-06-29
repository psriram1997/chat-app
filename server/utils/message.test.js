const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');

describe('test generate message',()=>{
    it('should generate correct message', ()=>{
        var from = "sriram";
        var text = "Welcome!!";
        var msg = generateMessage(from, text);
        expect(msg.createdAt).toBeA('number');
        expect(msg).toInclude({from,text});
        
    });
});

describe('generate Location message',()=>{
    it('should return a correct location object',()=>{
        const from = 'sriram';
        const lat = 10;
        const lng = 12;
        const url = 'https://www.google.com/maps?q=10,12';
        const obj = generateLocationMessage(from,lat,lng);
        expect(obj.createdAt).toBeA('number');
        expect(obj).toInclude({from,url});
    });
})