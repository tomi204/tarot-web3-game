

import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

actor class Token(
    _name : Text,
    _symbol : Text, 
    _decimals : Nat8,
    _totalSupply : Nat,
    _owner : Principal
) {
    // State
    private stable var name_ : Text = _name;
    private stable var symbol_ : Text = _symbol;
    private stable var decimals_ : Nat8 = _decimals;
    private stable var totalSupply_ : Nat = _totalSupply;
    private stable var owner_ : Principal = _owner;

    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    private var allowances = HashMap.HashMap<Principal, HashMap.HashMap<Principal, Nat>>(1, Principal.equal, Principal.hash);

    // Initialize owner balance
    balances.put(owner_, totalSupply_);

    // Metadata
    public query func name() : async Text {
        return name_;
    };

    public query func symbol() : async Text {
        return symbol_;
    };

    public query func decimals() : async Nat8 {
        return decimals_;
    };

    public query func totalSupply() : async Nat {
        return totalSupply_;
    };

    // Balance
    public query func balanceOf(who: Principal) : async Nat {
        switch (balances.get(who)) {
            case (?balance) {
                return balance;
            };
            case null {
                return 0;
            };
        };
    };

    // Transfer
    public shared(msg) func transfer(to: Principal, value: Nat) : async Bool {
        switch(balances.get(msg.caller)) {
            case (?from_balance) {
                if (from_balance >= value) {
                    let new_from_balance = from_balance - value;
                    balances.put(msg.caller, new_from_balance);

                    let to_balance = switch (balances.get(to)) {
                        case (?balance) { balance };
                        case null { 0 };
                    };
                    balances.put(to, to_balance + value);
                    return true;
                } else {
                    return false;
                };
            };
            case null {
                return false;
            };
        };
    };

    // Allowance
    public query func allowance(owner: Principal, spender: Principal) : async Nat {
        switch(allowances.get(owner)) {
            case (?owner_allowances) {
                switch(owner_allowances.get(spender)) {
                    case (?allowance) { return allowance; };
                    case null { return 0; };
                };
            };
            case null { return 0; };
        };
    };

    // Approve
    public shared(msg) func approve(spender: Principal, value: Nat) : async Bool {
        switch(allowances.get(msg.caller)) {
            case (?owner_allowances) {
                owner_allowances.put(spender, value);
            };
            case null {
                let spender_allowances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
                spender_allowances.put(spender, value);
                allowances.put(msg.caller, spender_allowances);
            };
        };
        return true;
    };

    // TransferFrom
    public shared(msg) func transferFrom(from: Principal, to: Principal, value: Nat) : async Bool {
        switch(allowances.get(from)) {
            case (?owner_allowances) {
                switch(owner_allowances.get(msg.caller)) {
                    case (?allowance) {
                        if (allowance >= value) {
                            switch(balances.get(from)) {
                                case (?from_balance) {
                                    if (from_balance >= value) {
                                        let new_allowance = allowance - value;
                                        owner_allowances.put(msg.caller, new_allowance);
                                        let new_from_balance = from_balance - value;
                                        balances.put(from, new_from_balance);
                                        let to_balance = switch (balances.get(to)) {
                                            case (?balance) { balance };
                                            case null { 0 };
                                        };
                                        balances.put(to, to_balance + value);
                                        return true;
                                    };
                                };
                                case null {};
                            };
                        };
                    };
                    case null {};
                };
            };
            case null {};
        };
        return false;
    };
}
