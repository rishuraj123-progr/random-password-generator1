import { useState , useCallback , useEffect,useRef} from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState("")


  //useRef hook

  const passwordRef=useRef(null)
  
  // just like the function callBack(function,arr[]);
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str=str+"0123456789"
    }
    if(charAllowed){
      str=str+"!@#$%^&*(){}[]~`_+="
    }

    for(let i=1;i<=length;i++){
          let char=Math.floor(Math.random()*str.length+1);
          pass=pass+str.charAt(char);
    }

    setPassword(pass)

  },[length,numberAllowed,charAllowed,setCharAllowed])

  
  const copyToClipBoard=useCallback(()=>{

    passwordRef.current?.select() //  to show the shadow that the password is copied
    passwordRef.current?.setSelectionRange(0,16)
   
    window.navigator.clipboard.writeText(password)  // this copy the password without the shadow 

  },[password])



  // use effect me ham ye kar rahe hai ki agar isme [length,numberAllowed,charAllowed,passwordGenerator] se kisi me chnage ho raha hai to dubara se run kardo
 useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
     {/* for the card os say the outer template  */}
      <div className='w-full max-w-md mx-auto shadow-md
      rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500
      '>
       
       {/* // for the text generator (just the written) */}
      <h1 className='text-red text-center my-3'><b>Text Generator</b></h1>


      {/* // for the search box  */}
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text" 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='enter password'
        readOnly
        ref={passwordRef}
        />

        <button 
        onClick={copyToClipBoard}
        className='bg-black px-3 hover:bg-green' >Copy</button>

      </div>
 
           {/* for setting the range of the password */}
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={20}
          value={length}
          className='cursur-pointer'
          onChange={(e)=>{setLength(e.target.value)}}  
           />
           <label>Length:{length}</label>
        </div>

      
      {/* for the tickk box whether we need number or not */}

      <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
         defaultChecked={numberAllowed}
         id="numberInput"
         onChange={()=>{
          setNumberAllowed((prev)=>!prev);
         }}
        />
        <label>Numbers</label>

      </div>

       
      {/* for the tickk box whether we need character or not */}

      <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
         defaultChecked={charAllowed}
         id="numberInput"
         onChange={()=>{
          setCharAllowed((prev)=>!prev);
         }}
        />

        <label >Characters</label>

      </div>

      </div>
      </div>

    </>
  )
}

export default App
