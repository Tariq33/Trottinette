package test;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestSpringXML {

	public static void main(String[] args) {

		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("application-context.xml");

		context.close();
	}

}
