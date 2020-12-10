import React, { Component } from 'react';
import Aux from '../../hoc/Aux_1';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat:1.3,
    bacon:0.7 
}

class BurgerBuilder extends Component {
    // constructor(prope){
    //     super(props);
    //     this.state = {

    //     }
    // }
    
    state = {
        ingredients : {
            bacon  : 0,
            salad  : 0,
            cheese : 0,
            meat   : 0
        },
        totalPrice  : 4,
        purchasable : false,
        purchasing  : false
    }

    updatePurchaseState (ingredients) {
        /* below code will give old state */
        // const ingredients = {
        //     ...this.state.ingredients
        // };

        const sum = Object.keys(ingredients).map((igKey)=>{
            return ingredients[igKey];
        })
        .reduce((sum,el)=>{
            return sum += el;
        },0);

        this.setState({purchasable:sum>0?true:false});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0){
            return;
        }

        const updatedCount = oldCount - 1;
        
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = ()=>{

        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () =>{

        const order = {
            ingredients: this.state.ingredients,
            price : this.state.totalPrice,
            customer : {
                name: "vil mark",
                address: {
                    street : "test",
                    pincode: '6545153',
                    country: 'India'
                },
                email:"testmail@mail.com"
            },
            delivery_method : "fastest"

        }

        axios.post('/orders.json',order)
        .then(response => console.log(response) )
        .catch(error => console.log(error ) )

        this.purchaseCancelHandler();

    }//purchaseContinueHandler end

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} continue={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    currentPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );   
    }
}

export default BurgerBuilder;