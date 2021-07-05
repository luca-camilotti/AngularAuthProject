export class Appstate {
    
    private user:string;
    private email:string;
    private token:string;
    private logged:boolean;
    private currentPage:Appstate.Navigation;
    constructor () {
        this.user = null;
        this.email = null;
        this.token = null;
        this.logged = false;
        this.currentPage = Appstate.Navigation.Index;
    }
    
    // Setters
    public setUser(v : string) {
        this.user = v;
    }
    public setEmail(v : string) {
        this.email = v;
    }
    public setToken(v : string) {
        this.token = v;
    }
    public setLogged() {
        this.logged = true;
    }
    public setUnlogged() {
        this.logged = false;
    }
    public setCurrentPage(v : Appstate.Navigation) {
        this.currentPage = v;
    }
    // Getters
    public getUser():string {
        return this.user;
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
    // List of all App pages to check navigation state
    export const enum Navigation
    {
        Index,
        Signin,
        Signup,
        Logout,
        Dashboard,
    }
}
