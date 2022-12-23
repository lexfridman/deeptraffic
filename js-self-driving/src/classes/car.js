/*
The Car class has several properties and methods:

    constructor: a method that is called when a new Car object is created. The constructor method takes four arguments: x, y, width, and height, and initializes the object's x, y, width, and height properties with these values. It also initializes several other properties of the object: speed, acceleration, maxSpeed, friction, and angle.
    update: a method that is called repeatedly to update the state of the Car object. The update method calls a private method of the object named #move().
    #move: a private method of the Car object that updates the object's speed, angle, and position based on the object's controls and other properties. The #move method includes several if statements that check the object's controls properties and modify the object's speed, angle, and position accordingly.
    draw: a method that draws the Car object on a canvas element using the 2D rendering context of the canvas. The method uses several methods of the rendering context, such as ctx.save(), ctx.translate(), ctx.rotate(), ctx.beginPath(), ctx.rect(), and ctx.fill(), to draw the object at the specified position and orientation on the canvas.
 */
class Car{
    /*
    The constructor takes four arguments: x, y, width, and height. These arguments are used to initialize the object's x, y, width, and height properties, respectively.

    The constructor also initializes several other properties of the object: speed, acceleration, maxSpeed, friction, and angle. The speed and angle properties are set to 0, the acceleration property is set to 0.2, the maxSpeed property is set to 3, and the friction property is set to 0.05.
    */
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0;

        this.controls=new Controls();
    }

    update(){
        this.#move();
    }

    #move(){
        /*
        if the object's controls.forward property is true, and if it is, the object's speed property is increased by the object's acceleration property.

        The controls.forward property is a boolean value that indicates whether the forward control is active. The speed property is a numeric value that represents the object's current speed. The acceleration property is a numeric value that represents the rate at which the object's speed increases.

        If the controls.forward property is true, this code will cause the object to accelerate in the direction it is facing by increasing its speed property by the value of its acceleration property.
        */
        if(this.controls.forward) this.speed+=this.acceleration;

        /*
        if the object's controls.reverse property is true, and if it is, the object's speed property is decreased by the object's acceleration property.

        The controls.reverse property is a boolean value that indicates whether the reverse control is active. The speed property is a numeric value that represents the object's current speed. The acceleration property is a numeric value that represents the rate at which the object's speed increases or decreases.

        If the controls.reverse property is true, this code will cause the object to decelerate by decreasing its speed property by the value of its acceleration property. This will cause the object to slow down or move in reverse, depending on its current direction.
        */
        if(this.controls.reverse) this.speed-=this.acceleration;

        /* 
        if the object's speed property is greater than its maxSpeed property, and if it is, it sets the object's speed property to the value of its maxSpeed property.

        The speed property is a numeric value that represents the object's current speed, and the maxSpeed property is a numeric value that represents the maximum speed at which the object is allowed to travel.

        This code is likely being used to prevent the object's speed from exceeding its maxSpeed limit. If the object's speed is greater than its maxSpeed, the speed property is set to the maxSpeed value, ensuring that the object's speed remains within the allowed range.
        */
        if(this.speed>this.maxSpeed) this.speed=this.maxSpeed;

        /*
        if the object's speed property is less than half of its maxSpeed property, and if it is, it sets the object's speed property to half of its maxSpeed property, but with a negative sign.

        The speed property is a numeric value that represents the object's current speed, and the maxSpeed property is a numeric value that represents the maximum speed at which the object is allowed to travel.

        This code is likely being used to prevent the object's speed from going too low in the reverse direction. If the object's speed is less than half of its maxSpeed in the negative direction (i.e. moving in reverse), the speed property is set to half of the maxSpeed value, but with a negative sign, ensuring that the object's speed remains within the allowed range in the reverse direction.
        */
        if(this.speed<-this.maxSpeed/2) this.speed=-this.maxSpeed/2;
       
        /*
        if the object's speed property is greater than 0, and if it is, it decreases the object's speed property by the value of its friction property.

        The speed property is a numeric value that represents the object's current speed, and the friction property is a numeric value that represents the rate at which the object's speed decreases.

        If the object's speed is greater than 0, this code will cause the object to slow down by decreasing its speed property by the value of its friction property. This could be used to simulate the effects of friction on the object's movement.
        */
        if(this.speed>0) this.speed-=this.friction;

        /*
        if the object's speed property is less than 0, and if it is, it increases the object's speed property by the value of its friction property.

        The speed property is a numeric value that represents the object's current speed, and the friction property is a numeric value that represents the rate at which the object's speed decreases.

        If the object's speed is less than 0, this code will cause the object to slow down by increasing its speed property by the value of its friction property. This could be used to simulate the effects of friction on the object's movement when it is moving in the reverse direction
        */
        if(this.speed<0) this.speed+=this.friction;

        /*
        if the absolute value of the object's speed property is less than the object's friction property, and if it is, it sets the object's speed property to 0.

        The speed property is a numeric value that represents the object's current speed, and the friction property is a numeric value that represents the rate at which the object's speed decreases.

        If the absolute value of the object's speed is less than the object's friction property, this code will set the object's speed to 0. This could be used to stop the object's movement when its speed becomes too low due to the effects of friction. The absolute value of a number is its numerical value without considering its sign (i.e. positive or negative). The Math.abs() function returns the absolute value of a number.
        */
        if(Math.abs(this.speed)<this.friction) this.speed=0;

        /*
        It appears to be checking if the object's speed property is not equal to 0, and if it is not, it updates the object's angle property based on the object's controls.left and controls.right properties.

        The speed property is a numeric value that represents the object's current speed. The controls.left and controls.right properties are boolean values that indicate whether the left and right controls are active, respectively. The angle property is a numeric value that represents the object's current angle of rotation.

        If the object's speed is not equal to 0 and either the controls.left or controls.right properties are true, this code will update the object's angle property. The angle is incremented by 0.03 if the controls.left property is true, and it is decremented by 0.03 if the controls.right property is true. The flip variable is used to determine the direction in which the object is moving. If the object's speed is greater than 0, flip is set to 1, otherwise it is set to -1. The angle is then updated by 0.03 multiplied by the value of flip. This causes the object to rotate in the direction opposite to its movement if it is moving in the reverse direction.
        */
        if(this.speed!=0){

            let flip=this.speed>0?1:-1;

            if(this.controls.left) this.angle+=0.03*flip;

            if(this.controls.right) this.angle-=0.03*flip;
        }

        /* 
        The x and y properties are being updated by subtracting the sine and cosine of the object's angle property, respectively, multiplied by the object's speed property. This will cause the object to move in a direction determined by its angle property at a speed determined by its speed property.

        The sine and cosine functions are trigonometric functions that take an angle as an input and return a value between -1 and 1. The sine function returns the y-coordinate of a point on the unit circle (a circle with radius 1) at a given angle. The cosine function returns the x-coordinate of a point on the unit circle at a given angle.

        By subtracting the sine and cosine of the object's angle from its x and y properties, respectively, the object's position is being updated in the opposite direction of the angle. For example, if the object's angle is 0 degrees (pointing to the right), the sine of 0 is 0 and the cosine of 0 is 1, so the x property will not change but the y property will be decreased by the object's speed property, causing the object to move up.

        */

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;

        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    }

    /*
     method for drawing an object on a canvas element using the 2D rendering context of the canvas (ctx).

    The ctx.save() and ctx.restore() methods are used to save and restore the current state of the rendering context, respectively. This allows the object to be drawn without affecting the rest of the canvas.

    The ctx.translate() method is used to move the coordinate system of the canvas by the specified amounts in the x and y directions. This allows the object to be drawn at the specified position on the canvas.

    The ctx.rotate() method is used to rotate the canvas by a specified angle in radians. The angle is specified as a negative value to rotate the object in the opposite direction of its angle property.

    The ctx.beginPath() and ctx.rect() methods are used to draw a rectangle on the canvas. The ctx.rect() method takes four arguments: the x and y coordinates of the top-left corner of the rectangle, and the width and height of the rectangle. The x and y coordinates are specified as negative values to draw the rectangle with its top-left corner at the center of the object. The ctx.fill() method is used to fill the rectangle with the current fill style of the canvas.
    */
    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();
    }
}