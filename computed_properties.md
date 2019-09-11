# Computed Properties

**Duration: 60 minutes**

### Learning Objectives

- Understand when to use Vue's computed properties
- Implement computed properties in our apps

## Introduction

In our Vue apps it might be necessary for us to display a variable that's built or calculated dependent on some other data in our app, be it in our state or otherwise. While there are many ways that do this - remember, Vue is an unopinionated framework - in this lesson we're going to look at a way of handling complex logic to dynamically update our html with the minimal fuss we're coming to expect from Vue.

For this lesson, we'll be working with an app that manages bank accounts.

> Hand out start point

```bash
npm run build
open public/index.html
```

> Allow a few minutes for students to read the start code.

### Modifiers

There's a couple of things in our HTML that you might not have seen before - `v-model.number` and `v-on:submit.prevent`. These `modifiers` can be added to our Vue directives for extra functionality.

In the case of `v-model.number`, the modifier is ensuring that our value here comes into our Vue instance as a number, to mitigate HTML element values being strings by default - this saves us having to write any additional `parseInt` logic in our Vue instance.

`v-on:submit.prevent`'s modifier is there to ensure that the default behaviour of the form is prevented - remember that normally this would trigger a GET request on the webpage we were currently looking at. Again, this is a neater way of handling `event.preventDefault()` in our Vue's instance.

Finally, you'll notice that the header of the app is intended to display the total of all the balances of the accounts held in the app's state. At the moment however, there's no code to provide this functionality. Let's think about how we might do this.

### Displaying the accounts total

Previously, we might have approached displaying the total of all the bank accounts with the tools already at our disposal - we could have a `totalAccounts` value in our state that could be worked out when our app fires `mounted`, but then that would only run once and never again. We could create a method that is called from `saveAccount`, whenever a new bank account is added, but then that would mean we would have to add an account before we even see the result of that calculation. We could combine both of these approaches, but to be frank we're making a lot of work for ourselves when there's a far more elegant solution - Vue's `computed property`.

## Making a computed property

A `computed property` is pretty much what it says on the tin - a property that is derived from the result of some form of computation. The rule of thumb is to use them whenever you want a property that would require some complex logic to display. To get the total of all these bank accounts, we're going to have to call `reduce` on `this.accounts`, and while there's nothing stopping us putting this function call straight into our template, it would make our template harder to read, and harder to maintain. The good news is that implementing a computed property isn't too different from any other thing we've added to our Vue instance's this week. Firstly, let's add a property of `computed` to our Vue instance which will, to begin with, point to an empty object.

```js
//app.js

data: {
  ...
},
computed: { //NEW

}
```

We can then add methods to this object that will return us the computed property we're after. In this case, we're looking for the total of all our account balances, so `totalBalances` seems like a pretty sensible name for the computed property.

```js
//app.js

computed: {
    totalBalances: function(){ // NEW

    }
}
```

Now if we look in our dev tools, we should see that as well as tracking our app's `data`, we now have a `computed` section, tracking all our computed properties. At the moment this will be showing as `undefined`, because that's what a function with no return value gets us. We'll fix that in a moment, but let's finish wiring our computed property up first. Referring to it in our html template is as easy as referring to any other variable in our app's state. Let's bring the result of this function in like so:

```html
<!-- index.html -->

<header>
  <h1>Bank of CodeClan</h1>
  <h2>Total deposits: £{{ totalBalances }} </h2>   <!-- MODIFIED -->
  <p>Total Deposits ☝️ should update dynamically when we add a new account.</p>
</header>
```

Great! So all we need do now is finish writing the function that will return the sum total of all of `this.accounts`'s account balances!

### Task (5 mins)

Finish writing the function that will return the sum total of all of `this.accounts`'s account balances.

### Solution

```js
computed: {
    totalBalances: function(){
      return this.accounts.reduce((runningTotal, account) => runningTotal + account.balance, 0); // MODIFIED
    }
}
```

Wonderful! Now whenever we add a bank account to our app, the computed property `totalBalances` is automatically recalculating its value. Although this `computed property` is the result of a method, it's important to bear in mind that it should be treated as a *property* - a value that we can call upon, and not a method that needs to be invoked, or rerun at any point. Let's practice with one more example to finish up - let's say that the user of this app requires the ability to filter `this.accounts` and only display accounts that have a minimum balance. How could we implement a computed property to do this?

### Task (15 minutes)

- Add an input that allows the user to dictate the minimum balance of accounts on display
- Use a computed property to display the result of `this.accounts` being filtered with the inputted filter amount.

### Solution

```html
<!-- index.html -->

<div id="filterInput">  <!-- NEW-->
  <h3>Filter Accounts By Minimum Value</h3>
  <input type="number" v-model.number="filterAmount"/>
</div>

```

```js
//app.js

data: {
  //AS BEFORE
    filterAmount: 0 // NEW
  },
computed: {
  totalBalances: function(){
    return this.accounts.reduce((runningTotal, account) => {
      return runningTotal + account.balance;
    }, 0);
  },
  filteredAccounts: function(){ //NEW
    return this.accounts.filter((account) => {
      return account.balance >= this.filterAmount;
    });
  }
}

```

```html
<!-- index.html -->

<section>
  <div class="account" v-for="account in filteredAccounts">  <!-- MODIFIED -->
    <h2>{{ account.name }}</h2>
    <p>Balance: £{{ account.balance }}</p>
  </div>
</section>

```

And now whenever the user inputs a number, the accounts displayed should have at least that amount as their balance.

## Recap

When should you implement a Computed Property?

<details>
<summary>Answer</summary>
Whenever you want a property that would require some complex logic to display.
</details>

## Conclusion

We've seen how `computed properties` are an elegant way to keep complex logic out of our html, while also shouldering the responsibility of updating their own value whenever our app's state changes; helping us manage our app's a bit more easily.
