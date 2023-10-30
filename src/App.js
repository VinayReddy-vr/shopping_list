import './App.css';
import { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronRight, faChevronLeft, faCircle, faCheckCircle, faTrash} from '@fortawesome/free-solid-svg-icons';


function App() {
  const [items,setItems] = useState([]);
  const [inputValue,setInputValue] = useState('')
  const [totalItemCount, setTotalItemCount] = useState(0);
  
  const handleAddItem = ()=>{
    if (inputValue.trim() !== '') {
    const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false,
		};
  

		const newItems = [...items, newItem];
    setItems(newItems);
    setInputValue('');
  }


  }

  const handleDecrement = (index)=>{
    const newItems = [...items];

		if(newItems[index].quantity===1)
    {
      newItems.splice(index, 1);
    }
    else{
      newItems[index].quantity--;
    }

		setItems(newItems);
     
  }

  const handleIncrement = (index)=>{
    const newItems = [...items];

		newItems[index].quantity++;

		setItems(newItems);

  }

  const toggleComplete=(index)=>{
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems);
  }

 
  useEffect(() => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
  }, [items]); 

  return (
  <div className='app_background'>
   <div className='S_Container'>
     <div className="add-item-box">
        <input className='add-Item-Input' value={inputValue}  onChange={(event)=> setInputValue(event.target.value)} placeholder='Add an Item... '/>
        <FontAwesomeIcon icon={faPlus} onClick={()=>handleAddItem()}/>
     </div>
     <div className='Item_List'>
      {items.map((item,index)=> (
        <div className='item_container'>
          <div className='item-name' onClick={()=>toggleComplete(index)}>{item.isSelected ? (
            <>
              <FontAwesomeIcon icon={faCheckCircle}/>
              <span className='checked'>{item.itemName}</span>
            </>
          ):(<>
              <FontAwesomeIcon icon={faCircle}/>
              <span>{item.itemName}</span>
          </>
          )}</div>
          <div className='quantity'>
								<button onClick={() => handleDecrement(index)}>
              {item.quantity === 1 ? (
              <FontAwesomeIcon icon={faTrash} />
               ) : (
               <FontAwesomeIcon icon={faChevronLeft} />
               )}
								</button>
								<span> {item.quantity} </span>
								<button>
									<FontAwesomeIcon icon={faChevronRight} onClick={() => handleIncrement(index)} />
								</button>
					</div>
        </div>
        
      ))}
     </div>
     <div className='totalcount'>
            Total:{totalItemCount}
          </div>
   </div>
   </div>
  );
}

export default App;
