
import { observable, h } from 'sinuous'
import { fn } from './util'


const store = (key, val) => localStorage.setItem(key, JSON.stringify(val))
const retrieve = (key) => JSON.parse(localStorage.getItem(key))


const List = (props) => {

	const items = observable(props.items || [])
	const inputValue = observable('')

	const save = () => {
		store('items', items())
		store('inputVal', inputValue())
	}

	const add = (value) => {
		items([...items(), { id : items().length + 1, text : value }])
		inputValue('')
		save()
	}

	const edit = (id, value) => {
		const index = items().findIndex((el) => (el.id === id))
		const newItems = items()
		if (index > -1) newItems[index].text = value
		items(newItems)
		save()
	}
	
	const remove = (id) => {
		const list = items()
		const index = list.findIndex((el) => (el.id === id))
		list.splice(index, 1)
		items(list)
		save()
	}

	const onSubmit = e => {
		e.preventDefault() 
		add(e.currentTarget.querySelector('input').value)
	} 

	return <div>
		<form onsubmit={onSubmit}>
			<input 
				type="text" 
				value={inputValue} 
				placeholder="Add an item…" 
			/>
		</form>
		<ul>
			{() => items().map((item) => 
				<ListItem id={item.id} text={item.text} onChange={edit} onRemove={remove} />
			)}
		</ul>
	</div>
}


const ListItem = ({ id, text, onChange, onRemove }) => {

	// observable
	const value = observable(text)
	const isEditing = observable(false)

	const editButtonText = () => (isEditing() && 'Save' || 'Edit')
	const change = (e) => fn(onChange)(id, e.currentTarget.value)
	const remove = (e) => fn(onRemove)(id)
	const edit = (e) => isEditing(!isEditing()) && focusInput()
	const focusInput = () => dom.querySelector('input').focus()

	const dom = <li>
		{() => !isEditing() && value }

		{() => isEditing() && 
			<input type="text" placeholder="Edit item…" value={value} onchange={change} onblur={change} />
		}

		<button onclick={edit}>{editButtonText}</button>
		<button onclick={remove}>x</button>
	</li>

	return dom
}

// init 
document.body.append(
	<List items={ retrieve('items') }/>
)