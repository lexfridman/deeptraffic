Lex to-do: badass gif version of the annimation we develop goes here

Lex to-do: add paper citation here.

Lex to-do: add mention of the sample code available in the repo

Lex to-do: add pictures of the shirt that people can get.

Jack to-do: add a version of the about page here.

# DeepTraffic: Deep Reinforcement Learning Competition

DeepTraffic is a deep reinforcement learning competition part of the [MIT Deep Learning for Self-Driving Cars](https://selfdrivingcars.mit.edu) course. The goal is to create a neural network to drive a vehicle (or multiple vehicles) as fast as possible through dense highway traffic. An instance of your neural network gets to control one of the cars (displayed in red) and has to learn how to navigate efficiently to go as fast as possible. The car already comes with a safety system, so you don’t have to worry about the basic task of driving – the net only has to tell the car if it should accelerate/slow down or change lanes, and it will do so if that is possible without crashing into other cars.

## Overview

![alt text](https://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2018/01/Screenshot-from-2018-01-08-17-45-42.png "DeepTraffic screenshot")

The game page consists of four different areas:

1. On the left, you can find a real time simulation of the road with different display options.
2. On the upper half of the page, you can find (1) a coding area where you can change the design of the neural network which controls the agents and (2) some buttons for applying your changes, saving/loading, and making a submission.
3. Below the coding area, you can find (1) a graph showing a moving average of the center red car’s reward, (2) a visualization of the neural network activations, and (3) buttons for training and testing your network.
4. Between the simulated roadway and the graphs, you can find the current image of you vehicle and some options to customize it and create a visualization of your best submisison
The simulation area shows some basic information like the current speed of the car and the number of cars that have been passed since you opened the site. It also allows you to change the way the simulation is displayed.

![alt text](http://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2017/01/normal.gif) ![alt text](http://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2017/01/fast.gif)

The simulation uses *frames* as an internal measure of time – so neither a slow computer, nor a slow net influences the result. The *Simulation Speed* setting lets you control how the simulation is displayed to you – using the *Normal* setting the simulation tries to draw the frames matching real time, so it waits if the actual calculation is going faster – *Fast* displays frames as soon as they are finished, which may be much faster.

Internally the whole game runs on a grid system. You can see it if you change the *Road Overlay* to *Full Map*:

![alt text](http://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2017/01/normal.gif)

For each car the grid cells below it are filled with the car’s speed, empty cells are filled with a high value to symbolize the potential for speed.

Your car gets a car-centric cutout of that map to use as an input to the neural network. You can have a look at it by changing the *Road Overlay to Learning Input*:

![alt text](https://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2017/01/Screen-Shot-2017-01-03-at-16.06.29-151x300.png)


The following variables control the size of the input the net gets – a larger input area provides more information about the traffic situation, but it also makes it harder to learn the relevant parts, and may require longer learning times. (But you should definitely change the input size of one we have in the starting sample – that one makes the car essentially blind)

```javascript
lanesSide = 1;
patchesAhead = 10;
patchesBehind = 0;
```

The basic algorithm that powers all the other cars, and also the basis of yours is called *Safety System* you can have a look at it by switching the *Road Overlay*:

![alt text](https://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2017/01/Screen-Shot-2017-01-03-at-16.28.22-150x300.png) ![alt text](https://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2017/01/Screen-Shot-2017-01-03-at-16.28.32-152x300.png) ![alt text](https://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2017/01/Screen-Shot-2017-01-03-at-16.29.02-139x300.png)

The highlighted cells tell you what it is looking at, if they are red the Safety System currently blocks going in that direction. The front facing part of the Safety System makes the car slow down to avoid hitting obstacles. Lane switching is disabled while there is any other car in the highlighted area, and if you are already in the process of switching lanes. The checked area increases depending how fast you are trying to go – so just flooring it is not always a good idea.

The agent is controlled by a function called learn that receives the current state (provided as a flattened array of the defined learning input cutout), a reward for the last step (in this case the average speed in mph) and has to return one of the following actions:

```javascript
var noAction = 0;
var accelerateAction = 1;
var decelerateAction = 2;
var goLeftAction = 3;
var goRightAction = 4;
```

The most basic learn function that simply tells the agent to hold its speed and lane would look like:

```javascript
learn = function (state, lastReward) {
    return 0;
}
```

For the competition you are supposed to use a neural network to control the car – the learn function

```javascript
learn = function (state, lastReward) {
    brain.backward(lastReward);
    var action = brain.forward(state);
 
    draw_net();
    draw_stats();
 
    return action;
}
```

to make this happen is already provided in the initial code sample and can stay the same; you are of course free to do your own data preprocessing before feeding the state to the net, but don’t spend too much time on it – most (if not all) of the improvements should come from adapting the net (and you are able to get a fairly decent speed without doing any preprocessing at all – way beyond the required minimum to pass the course).

## Training and Evaluation
To train the neural network you have to press the Run Training button:

![alt text](https://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2017/01/Screen-Shot-2017-01-03-at-16.54.32-300x108.png)

This will start training the neural network by running the simulation in a separate thread with about 30 times realtime speed and apply the trained net back to the visible simulation from time to time so you should be able to see immediate improvements (only if your net layout is any good of course).

The site also provides an evaluation button that is going to run exactly the same evaluation we are using for the competition.

![alt text](https://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2017/01/Screen-Shot-2017-01-03-at-16.36.39-300x89.png)

The evaluation run also happens on a separate thread simulating 500 runs of about 30 seconds each. For each run it computes the average speed per run, and the final score will be the median speed of the 500 runs.

You have to keep in mind that your local evaluation only gives you an estimate of the actual score, as there is some random component involved in how the other cars behave. The relevant score the one we compute. (And we will also look at your code to see if there is any kind of cheating involved, which would get you banned – so don’t even try).

You can find your best speed on your profile page, and if you are really good in the top 10 [leaderboard](https://selfdrivingcars.mit.edu/leaderboard).

## Controlling Multiple Vehicles

You can control up to 10 vehicles. By changing the following line of code

```javascript
otherAgents = 9; // plus the tracked agent
```

Each agent runs an instance of your algorithm, thus they cannot plan collectively. To drive fast, your network will have to learn to avoid causing traffic jams. With multiple agents, your score is the average velocity of the agents.

## Designing the Neural Network

To change the default neural network layout we provide (**which is intentionally changed to perform badly**) you have to change the code in the code box on the website.

![alt text](https://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2017/01/Screen-Shot-2017-01-03-at-16.56.09-300x69.png)

The apply code button runs the code to create the newly defined neural network (watch out: you will lose the training state you had before).

![alt text](https://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2017/01/Screen-Shot-2017-01-03-at-16.57.51-300x72.png) ![alt text](https://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2017/01/Screen-Shot-2017-01-03-at-16.57.58-300x72.png)

And the save and load buttons allow you to save your code and the trained net state to your machine and load it back afterwards. **Save regularly!**

## Looking at the Code

```javascript
lanesSide = 0;
patchesAhead = 1;
patchesBehind = 0;
trainIterations = 10000;
```
Defines the most basic settings – for larger inputs you should probably increase the number of train iterations. Actually looking ahead a few patches, and at least one lane to the side is probably a good idea as well.

The net is defined with an array of layers starting with the input which you don’t have to change:

```javascript
var layer_defs = [];
layer_defs.push({
    type: 'input',
    out_sx: 1,
    out_sy: 1,
    out_depth: network_size
});
```

We added one basic hidden layer with just one neuron to show you how to do that – you should definitely change that:

```javascript

layer_defs.push({
    type: 'fc',
    num_neurons: 1,
    activation: 'relu'
});
```

And in the end there is the final regression layer that decides on the action, which probably is fine as it is:

```javascript
layer_defs.push({
    type: 'regression',
    num_neurons: num_actions
});
```
There are a lot more options for the Q-Learning part – details on them can be found in the comments of the code at the following link: <https://github.com/karpathy/convnetjs/blob/master/build/deepqlearn.js> These are mostly interesting for more advanced optimisations of your net.

```javascript
var tdtrainer_options = {
    learning_rate: 0.001,
    momentum: 0.0,
    batch_size: 64,
    l2_decay: 0.01
};
 
var opt = {};
opt.temporal_window = temporal_window;
opt.experience_size = 3000;
opt.start_learn_threshold = 500;
opt.gamma = 0.7;
opt.learning_steps_total = 10000;
opt.learning_steps_burnin = 1000;
opt.epsilon_min = 0.0;
opt.epsilon_test_time = 0.0;
opt.layer_defs = layer_defs;
opt.tdtrainer_options = tdtrainer_options;
```

And the last step is creating the brain.

```javascript
brain = new deepqlearn.Brain(num_inputs, num_actions, opt);
```

## Submission

To submit your neural network for evaluation press the submit button:

![alt text](https://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2017/01/Screen-Shot-2017-01-03-at-16.58.01-300x56.png)

Make sure you run training and a local evaluation first and only submit if you are happy with the performance. You can submit multiple times and we will take your best result, but doing it too often is not a good idea: submission adds your net to the back of our evaluation queue, but you can only have one spot there, so if you resubmit before evaluation is done, you get bumped to the back again. To see the results of our evaluation go to your [profile page](https://selfdrivingcars.mit.edu/profile/).

## Customization & Visualization

Between the simulated highway and the graphs is an image of your vehicle, options to customize the look of DeepTraffic, and a button to request a visualization of your best submission.

![alt text](https://selfdrivingcars.mit.edu/wordpress/wp-content/uploads/2018/01/Screenshot-from-2018-01-08-17-37-40-146x300.png)

To upload a custom vehicle image (png files only), click the LOAD CUSTOM IMAGE button. After selecting a png file, you need to crop it to a 268×586 image. You can also customize the color scheme, e.g. the trail of the centered agent, with the drop down color selector. After you have made a submission you can request a visualization of your best performance. This visualization is a .mp4 file. When it is ready, you will find a download link on your profile page.

References:
[ConvNetJS](http://cs.stanford.edu/people/karpathy/convnetjs/)
[Deep Q-Learning using ConvNetJS](http://cs.stanford.edu/people/karpathy/convnetjs/demo/rldemo.html)
