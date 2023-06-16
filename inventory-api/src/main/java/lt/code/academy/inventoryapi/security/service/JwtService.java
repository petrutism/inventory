package lt.code.academy.inventoryapi.security.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lt.code.academy.inventoryapi.user.dto.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    private final byte[] secretkey;
    private final long tokenValidMs;

    public JwtService(@Value("${security.jwt.secret.key}") byte[] secretKey,
                      @Value("#{${security.jwt.token.valid.min}*60000}") long tokenValidMs){
        this.secretkey = secretKey;
        this.tokenValidMs = tokenValidMs;
    }

    public String generateToken(User user){
        Date date = new Date();
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setAudience("inventory-ui")
                .setIssuer("inventory-api")
                .setIssuedAt(date)
                .setExpiration(new Date(date.getTime() + tokenValidMs))
                .setSubject(user.getUsername())
                .claim("roles", user.getRoles())
                .signWith(Keys.hmacShaKeyFor(secretkey), SignatureAlgorithm.HS512)
                .compact();
    }
    private String generateSecretKey() {
        SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        return Encoders.BASE64.encode(secretKey.getEncoded());
    }
}
