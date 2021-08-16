const items = [
    { id: 1, name: 'Helado de pejelagarto' },
    { id: 2, name: '2 kg. de banana' },
    { id: 3, name: '2 coca-colas' },
]

const itemService = {
    getItems: () => Promise.resolve(items),
    addItem: item => { items.push(item); return Promise.resolve("success") },
    deleteItem: id => {
        const index = items.findIndex( item => item.id === id)
        items.splice(index, 1)
        return Promise.resolve("success")
    }
}

module.exports = itemService