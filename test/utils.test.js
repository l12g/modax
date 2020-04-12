const { expect } = require('chai');
const { isString, isBoolean, isPromise, isNumber, isFunction, isArray,toCamenCase,isUnDef } = require('../src/core/utils');
describe('测试工具函数', () => {
    it('类型判断', () => {
        expect(isString('str')).to.be.true;
        expect(isFunction(Function.prototype)).to.be.true;
        expect(isNumber(1)).to.be.true;
        expect(isArray([])).to.be.true;
        expect(isPromise(Promise.resolve())).to.be.true;
        expect(isBoolean(true)).to.be.true;
        let ud;
        expect(isUnDef(ud)).to.be.true;
    });
    it('驼峰转换',()=>{
        expect(toCamenCase('hello-world')).to.be.equal('helloWorld');
        expect(toCamenCase('hello_world')).to.be.equal('helloWorld');
    });
});