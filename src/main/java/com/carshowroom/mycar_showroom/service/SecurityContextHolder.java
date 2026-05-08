package com.carshowroom.mycar_showroom.service;
 
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
 

 
public class SecurityContextHolder {
 
   
    private SecurityContextHolder() {
        // private: prevents external instantiation
    }
 
    private static final class Holder {
        private static final SecurityContextHolder INSTANCE = new SecurityContextHolder();
    }
 
    
    public static SecurityContextHolder getInstance() {
        return Holder.INSTANCE;
    }
 
    // ------------------------------------------------------------------ //
    //  Public API                                                         //
    // ------------------------------------------------------------------ //
 
   
    public String getCurrentUsername() {
        Authentication auth = getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return null;
        String name = auth.getName();
        return "anonymousUser".equalsIgnoreCase(name) ? null : name;
    }
 
    
    public boolean isAuthenticated() {
        return getCurrentUsername() != null;
    }
 
    
    public Authentication getAuthentication() {
        SecurityContext ctx = org.springframework.security.core.context.SecurityContextHolder.getContext();
        return ctx != null ? ctx.getAuthentication() : null;
    }
 
    
    public void clearContext() {
        org.springframework.security.core.context.SecurityContextHolder.clearContext();
    }
}