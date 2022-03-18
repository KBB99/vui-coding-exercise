import React from "react";
import "./stylesheets/VuiContainer.scss";
import { TextInput, Filters } from "./VuiComponents";
import { searchResults } from "../assets/data/search-results.js";
import "./stylesheets/ProductSearch.scss";

function ListItem(props) {
  const { onClick, price, description, imgSrc, navigationUrl, rating, aisle, bay, availability } = props;
  return (
    <a href={navigationUrl}>
      <button className="list-item">
        <div className="d-flex">
          <img src={imgSrc} alt="" className="product-icon"></img>
          <div>
            <h6 className="title">{price}<br/>{"\u2B50".repeat(rating)}</h6>
            <p className="subtitle">{description}</p>
            <h6 className="title">{(availability>0)?"Available at ":"Unavailable"} Aisle: {aisle} | Bay: {bay}</h6>
          </div>
        </div>
        <hr className="list-divider"></hr>
      </button>
    </a>
  );
}

class ProductResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: searchResults,
      searched: false
    };
  }
  onFilter(filter) {
    var sortedResults
    console.log(this.state.currentFilter == filter)
    switch (filter) {
      case "availability":
        if (this.state.filteredAvailability){
          sortedResults = searchResults
          this.setState({filteredAvailability:false})
        }
        else{
          sortedResults = searchResults.filter((item)=>{
            return item.availability > 0
          })
          this.setState({filteredAvailability:true})
        }
        break;
      default:
        if (this.state.currentFilter == filter){
          sortedResults = this.state.searchResults.reverse();
        }
        else{
          sortedResults = searchResults.sort((item1, item2)=> {
            if (filter === "price"){
              return parseFloat(item2[filter].substring(1) - parseFloat(item1[filter].substring(1)));
            }
            else{
              return item2[filter] - item1[filter];
            }
          })
        }
        break
    }
    this.setState({searchResults:sortedResults, currentFilter: filter})
  }
  search(e) {
    if (e.code === "Enter") {
      e.preventDefault();
      this.setState({searched:true});
      // Fetch from server below
      // fetch()
    }
  }
  render() {
    return (
      <div className="vui-container">
        <div className="select-product-inner-container">
        <div className="mb-5 select-product-screen">
          <h5 className="mt-3 mb-5" style={{ maxWidth: "80%", margin: "auto" }}>
            {(!this.state.searched)?"Search":"Search Results"}
          </h5>
          <TextInput
            placeholder="Search Product (i.e. Harbor Fan)"
            icon="fa fa-search"
            value={this.state.searchTerm}
            onChange={(e) => {this.setState({searchTerm: e.target.value});}}
            onKeyDown={(e) => this.search(e)}
          />
          <Filters onFilter={(e) => {this.onFilter(e)}}/>
          {(this.state.searched)&&<div className="list">
            {this.state.searchResults.map((item, index) => {
              return (
                <ListItem
                  price={item.price}
                  description={item.description}
                  imgSrc={item.imageUrl}
                  navigationUrl={item.navigationUrl}
                  rating={item.rating}
                  aisle={item.aisle}
                  bay={item.bay}
                  availability={item.availability}
                />
              );
            })}
          </div>}
        </div>
        </div>
      </div>
    );
  }
}

export default ProductResults;
