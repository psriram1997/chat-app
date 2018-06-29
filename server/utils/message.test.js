const expect = require('expect');
const {generateMessage} = require('./message');

describe('test generate message',()=>{
    it('should generate correct message', ()=>{
        var from = "sriram";
        var text = "Welcome!!";
        var msg = generateMessage(from, text);
        expect(msg.createdAt).toBeA('number');
        expect(msg).toInclude({from,text});
        
    });
});