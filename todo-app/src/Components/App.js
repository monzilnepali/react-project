import React from "react";
import ListItem from "./ListItem";
import '../Style/app.css'
import '../Style/listItem.css'
import Header from "./Header";
import Search from "./Search";
import ListItemDefaultBg from "./ListItemDefaultBg";
class App extends React.Component{
    constructor() {
        super();
        this.state={
            addNoteData:"",
            searchData:"",
            activeTabId:0,
            list:[],
            tab:[{
                title:'Home',
                status:true
            }, {
                title: 'Completed',
                status: false
            },{
                title:'Remaining',
                status:false
            }
            ]

        }

    }
    InputChange=(event)=>{
        this.setState({
            addNoteData:event.target.value
        });
    }
    addNote=(event)=>{
        if(event.key==='Enter'){
            this.setState({
                list:this.state.list.concat({
                        data:event.target.value,
                        isCompleted:false}
                    ),
                addNoteData:""
            });
        }
    }
    clickHandler=(id)=>{
        console.log("clicked"+id);
        const item=this.state.list.map((item,index)=> {
            if(index===id){
                item.isCompleted=!item.isCompleted;
            }
            return item
        });
        this.setState(item)

    }
    changeTab=(id)=>{
        this.setState({
            activeTabId:id
        });
        const tabItem=this.state.tab.map((tab,index)=>{
            if(id===index){
                tab.status=true;
            }else{
                tab.status=false;
            }
            return tab;

        });
        this.setState(tabItem)
    }
    searchInputHandler=(event)=>{

        this.setState({
            searchData:event.target.value
        });
        console.log(this.state.searchData)
    }
    filterData=(array=[],search='')=>array.filter((value) => {
        if(value.data.includes(search)){
            switch(this.state.activeTabId){
                case 0:
                    return value;
                    break;
                case 1:
                    if(value.isCompleted) {
                        return value;
                    }
                    break;
                case 2:
                    if(!value.isCompleted) {
                        return value;
                    }
                    break;

            }

        }
    });

    render() {
        return (
            <div className={'container'}>
                <Header handler={this.changeTab} data={this.state.tab}/>
                <div className="main-body">
                    <Search handler={this.searchInputHandler}/>
                <input type="text" className={'add-note'} placeholder={'Add Note'} autoFocus={true} value={this.state.addNoteData} onChange={this.InputChange} onKeyPress={this.addNote} />
               <div className="list-container">
                   {
                       this.state.list.length===0?<ListItemDefaultBg/> :this.filterData(this.state.list,this.state.searchData).map((value,index)=><ListItem clickHandler={()=>this.clickHandler(index)} data={value.data} key={index} status={value.isCompleted}/>)
                   }
               </div>

                </div>
            </div>

        )
    }
}
export default App