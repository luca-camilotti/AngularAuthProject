
// Keep the application state
export class Appstate {
    
    private user:string;
    private role:Appstate.Roles;
    private email:string;
    private token:string;
    private logged:boolean;
    private currentPage:Appstate.Navigation;
    constructor () {
        this.user = null;
        this.role = Appstate.Roles.Guest;
        this.email = null;
        this.token = null;
        this.logged = false;
        this.currentPage = Appstate.Navigation.Index;
    }
    
    // Setters
    public setUser(v : string) {
        this.user = v;
    }
    public setRole(v : Appstate.Roles) {
        this.role = v;
    }
    public setEmail(v : string) {
        this.email = v;
    }
    public setToken(v : string) {
        this.token = v;
    }
    public setLoggedIn() {
        this.logged = true;
    }
    public setLoggedOut() {
        this.logged = false;
    }
    public setCurrentPage(v : Appstate.Navigation) {
        this.currentPage = v;
    }
    // Getters
    public getUser():string {
        return this.user;
    }
    public getRole():Appstate.Roles {
        return this.role;
    }
    public getEmail():string {
        return this.email;
    }
    public getToken():string {
        return this.token;
    }
    public isLogged(): boolean {
        return this.logged;
    }    
    public getCurrentPage():Appstate.Navigation {
        return this.currentPage;
    }
    
}

export namespace Appstate
{
    // List of all App pages to keep track of navigation state
    export const enum Navigation
    {
        Index,
        Signin,
        Signup,
        Logout,
        Dashboard
    }

    // Type of users (level of privilegies)
    export const enum Roles
    {
        Guest,
        User,
        PowerUser,
        Admin        
    }
}
