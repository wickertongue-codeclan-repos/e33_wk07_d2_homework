import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: "#app",
    data: {
      accounts: [
        { name: "Daniella Ellicombe", balance: 600 },
        { name: "Barbara Rabson", balance: 750 },
        { name: "James Schofield", balance: 200 },
        { name: "Irma Diloway", balance: 1200 }
      ],
      newAccount: {
        name: "",
        balance: 0
      },
      filterAmount: 0
    },
    computed: {
      totalBalances: function () {
        return this.accounts.reduce((runningTotal, account) => runningTotal + account.balance, 0);
      },
      filteredAccounts: function () {
        return this.accounts.filter((account) => {
          return account.balance >= this.filterAmount;
        });
      }
    },
    methods: {
      saveAccount: function(){
        this.accounts.unshift(this.newAccount);

        this.newAccount = {
          name: "",
          balance: 0
        };
      }
    }
  });
});
