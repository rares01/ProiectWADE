package com.wed.authentication;

import com.wed.entity.User;
import com.wed.exception.DisabledRequestsException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DisabledRequestsFilter extends OncePerRequestFilter {
    static final List<String> validPaths = List.of(
            "/api/authenticate",
            "/api/authenticate/register",
            "/api/authenticate/login",
            "/api/user",
            "/api/user/preferences",
            "/api/user/firstLogin",
            "/api/user/getPreferences",
            "/api/sparql"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null) {
            boolean shouldCheckRequest = !checkIfShouldDisableRequest(request.getRequestURI());

            if (isUser() && shouldCheckRequest) {
                handleDisabledRequests(response);
                throw new DisabledRequestsException("NOT_LOGGED_IN");
            }
        }

        filterChain.doFilter(request, response);
    }

    private void handleDisabledRequests(HttpServletResponse response) throws IOException {
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.getWriter().write("NOT_LOGGED_IN");
        response.getWriter().flush();
        response.getWriter().close();
    }

    private boolean isUserApproved() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getFirstLogin();
    }

    private boolean isUser() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return Objects.equals(user.getRole(), "ROLE_USER");
    }

    private boolean checkIfShouldDisableRequest(String path) {
        return validPaths.stream().anyMatch(pathToCheck -> matchesPath(pathToCheck, path));
    }

    private static boolean matchesPath(String pathToCheck, String path) {
        String regex = "^" + pathToCheck
                .replace("/", "\\/")
                + "$";

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(path);

        return matcher.matches();
    }
}
