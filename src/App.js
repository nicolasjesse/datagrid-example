import lemonade from 'lemonadejs';
import '@lemonadejs/datagrid/dist/style.css';
import Datagrid from '@lemonadejs/datagrid';

function App() {
    const self = this;
    self.data1 = [
        { number: 2, group: "B" },
        { number: 1, group: "C" },
        { number: 2, group: "C" },
    ];
    self.data2 = [
        { number: 6, group: "A" },
        { number: 2, group: "A" },
        { number: 3, group: "B" },
        { number: 4, group: "D" }
    ];
    self.columns1 = [
        {
            name: 'group',
            headerName: 'Group',
            width: '100px',
            align: 'center' },
        {
            name: 'actions',
            headerName: 'Actions',
            width: '100px',
            renderCell: `<input type="button" value="Send to Grid 2" onclick="self.parent.parent.send(self, 2)" />`
        },
    ]
    self.columns2 = [
        {
            name: 'number',
            headerName: 'Number',
            width: '100px',
            align: 'center' },
        {
            name: 'actions',
            headerName: 'Actions',
            width: '100px',
            renderCell: `<input type="button" value="Send to Grid 1" onclick="self.parent.parent.send(self, 1)" />`
        },
    ]
    self.send = function (row, destination) {
        if (destination == 2) {
            self.data1.splice(self.data1.indexOf(row), 1)
            self.data2.push({ number: row.number, group: row.group })
        } else if (destination == 1) {
            self.data2.splice(self.data2.indexOf(row), 1)
            self.data1.push({ number: row.number, group: row.group })
        }
        self.grid1.loadPages()
        self.grid2.loadPages()
        setTimeout(() => self.check(), 100)
    }
    self.check = function () {
        if (self.grid1.data.reduce((acc, curr) => acc + curr.number, 0) == 10) {
            if (self.grid1.data.every((obj) => {
                const sameKeyValues = self.grid1.data.filter(item => item['group'] === obj['group']);
                return sameKeyValues.length === 1;
            })) {
                alert('You solved it!')
            }
        }
    }
    return `<div style="display: flex; justify-content: space-evenly;">
                <div>
                    <h2>Grid 1</h2>
                    <Datagrid data={{self.data1}} columns={{self.columns1}} :ref="grid1"/>
                </div>
                <div>
                    <h2>Grid 2</h2>
                    <Datagrid data={{self.data2}} columns={{self.columns2}} :ref="grid2"/>
                </div>
        </div>`
}

lemonade.setComponents({ Datagrid });

export default App;