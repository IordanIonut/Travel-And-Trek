package com.example.App.Authentication;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
@Setter
public class CustomUserDetails implements UserDetails {
    private String email;
    private String password;
    private String name;
    private String profilePicture;
    private String[] hastag;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(String email, String password, String name, String profilePicture, String[] hastag, Collection<? extends GrantedAuthority> authorities) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.profilePicture = profilePicture;
        this.authorities = authorities;
        this.hastag = hastag;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getUsername() {
        return "";
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}