package com.carshowroom.mycar_showroom.service;
 
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
 
/**
 * Singleton wrapper around Spring's SecurityContextHolder.
 *
 * Provides a single shared access point for reading the currently
 * authenticated user anywhere in the service layer, without coupling
 * every class directly to the Spring Security API.
 *
 * Singleton guarantee: only one instance is ever created (lazy, thread-safe
 * via the initialization-on-demand holder idiom).
 */
public class SecurityContextHolder {
 
    // ------------------------------------------------------------------ //
    //  Singleton — initialization-on-demand holder idiom                  //
    //  The JVM guarantees that Holder is loaded (and instance created)    //
    //  exactly once, the first time getInstance() is called.              //
    // ------------------------------------------------------------------ //
 
    private SecurityContextHolder() {
        // private: prevents external instantiation
    }
 
    private static final class Holder {
        private static final SecurityContextHolder INSTANCE = new SecurityContextHolder();
    }
 
    /** Returns the single shared instance. */
    public static SecurityContextHolder getInstance() {
        return Holder.INSTANCE;
    }
 
    // ------------------------------------------------------------------ //
    //  Public API                                                         //
    // ------------------------------------------------------------------ //
 
    /**
     * Returns the username of the currently authenticated principal,
     * or {@code null} if the request is unauthenticated / anonymous.
     */
    public String getCurrentUsername() {
        Authentication auth = getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return null;
        String name = auth.getName();
        return "anonymousUser".equalsIgnoreCase(name) ? null : name;
    }
 
    /**
     * Returns {@code true} when there is a fully authenticated user
     * (not anonymous, not null).
     */
    public boolean isAuthenticated() {
        return getCurrentUsername() != null;
    }
 
    /**
     * Returns the raw Spring {@link Authentication} object, or {@code null}.
     * Use this when you need roles / authorities directly.
     */
    public Authentication getAuthentication() {
        SecurityContext ctx = org.springframework.security.core.context.SecurityContextHolder.getContext();
        return ctx != null ? ctx.getAuthentication() : null;
    }
 
    /**
     * Clears the current security context (used on logout or auth failure).
     */
    public void clearContext() {
        org.springframework.security.core.context.SecurityContextHolder.clearContext();
    }
}