package org.dolymy.post.configAOP;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class ConfigAOP {
    @Before("execution(* org.dolymy.post.services.*.*(..))")
    public void logMethodEntry (JoinPoint joinPoint){
        String name = joinPoint.getSignature().getName();
        System.out.println("Method : " + name );
    }
/*
    @Around("execution(* org.dolymy.post.services.*.*(..))")
    public Object profile(ProceedingJoinPoint pjp) throws Throwable {
        long start = System.currentTimeMillis();
        Object obj = pjp.proceed();
        long elapsedTime = System.currentTimeMillis() - start;
        System.out.println("Method execution time: " + elapsedTime + " [ms]");
        return obj;
    }

 */
}
