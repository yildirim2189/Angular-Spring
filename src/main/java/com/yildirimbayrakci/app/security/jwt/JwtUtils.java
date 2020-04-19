package com.yildirimbayrakci.app.security.jwt;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.Date;

@Component
public class JwtUtils {
  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  @Value("${my.app.jwtSecret}")
  private String jwtSecret;

  @Value("${my.app.jwtExpirationMs}")
  private int jwtExpirationMs;

  public String generateJwtToken(Authentication authentication){
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();

    return Jwts.builder()
      .setSubject(userDetails.getUsername())
      .setIssuedAt(new Date())
      .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
      .signWith(SignatureAlgorithm.HS512, jwtSecret)
      .compact();
  }

  public String getUsernameFromJwtToken(String token){
    return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateJwtToken(String authToken){
    try {
      Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
      return true;
    }catch (SignatureException exc){
      logger.error("Invalid JWT Signature: " + exc.getMessage());
    }catch (MalformedJwtException exc){
      logger.error("Invalid JWT Token: " + exc.getMessage());
    }catch (ExpiredJwtException exc){
      logger.error("JWT Token is expired: " + exc.getMessage());
    }catch (UnsupportedJwtException exc){
      logger.error("JWT Token is not supported: " + exc.getMessage());
    }catch (IllegalArgumentException exc){
      logger.error("JWT claims string is empty: " + exc.getMessage());
    }
    return false;
  }
}
