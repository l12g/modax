const node = require('../src/core/node');
const { expect } = require('chai')
const html = `
    <div class='root' name='div' _id='div'>
        <span class='text' _text='div'>hello</span>
        <ul>
            <li>1</li>
            <li>2</li>
        </ul>
    </div>
    `;
const res = node.parse(html);
const root = document.createElement('div');
node.patch(root, res, { div: 'hello' });
describe('节点相关测试', () => {
    it('parse:解析节点', () => {
        expect(res.tag).to.be.equal('div');
    });
    it('parse:解析样式', () => {
        expect(res.staticClasses.join('')).to.be.equal('root');
    })
    it('parse:解析动态属性', () => {
        expect(res.userAttrs.id).to.be.equal('div');
    })
    it('parse:解析静态属性', () => {
        expect(res.attrs.name).to.be.equal('div');
    })
    it('parse:解析子节点', () => {
        expect(res.children.length).to.be.equal(2);
    });

    it('patch:根节点', () => {
        expect(root.querySelector('.root')).to.be.exist;
    });
    it('patch:节点属性', () => {
        expect(root.querySelector('.root').getAttribute('name')).to.be.equal('div');
    });
    it('patch:子节点', () => {
        expect(root.querySelector('ul')).to.be.exist;
    });
})

