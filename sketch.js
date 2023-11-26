let gridSize = 50;
let cameraX = 0;
let cameraY = 0;
let cameraZ = 200;
let speed = 5;
let cameraSpeed = 10;
let sprintSpeed = 20;
let bobAmount = 2;
let movingForward = false;
let movingBackward = false;
let movingLeft = false;
let movingRight = false;
let sprinting = false;
let pitchLimit;
let noiseOffset = 0;
let fadeSpeed = 2;
let img;
let cam;
let camX = 0;
let camY = 0;
let camZ = 0;
let bobAmplitude = 0.5; // Adjust the amplitude for the bobbing effect
let bobSpeed = 100; // Adjust the speed of the bobbing effect
let mouseXPrev;
let text3D;
let text3D2;
let text3D3;
let text3D4;
let text3D5;
let text3D6;
let textClicked = false;
let font;
let verticalImagesFront = [];
let verticalImagesBack = [];
let currentAngle = 0;
let currentAngle2 = 0;
let targetAngle = 0;
let targetAngle2 = 0;
let rotationSpeedf = 0.05; // Adjust this value for the animation speed
let frontTexture;
let backTexture;
let h = 0;
let animateText = false;
let animateText2 = false;
let animateText3 = false;
let animateText4 = false;
let animateText5 = false;
let animateText6 = false;

// Variables for the abstract forms
let rotationAngle = 0;
let rotationSpeed = 0.02;
let formScale = 1000;
let formAmplitude = 100;

let lookAtX = 0;
let lookAtY = -200;
let lookAtZ = 0;

function preload() {
  font = loadFont("Txt Regular.ttf");
  frontTexture = loadImage("frame.png"); // Replace 'front_texture.jpg' with your front texture image file
  backTexture = loadImage("hippie-flowers-jeff-hobrath.jpg"); // Replace 'back_texture.jpg' with your back texture image file
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  camZ = 200; // Set the pitch limit to 60 degrees
  cam.setPosition(camX, -200, camZ);
  cam.lookAt(0, -200, 0);
  mouseXPrev = mouseX;
  for (let i = 0; i < 5; i++) {
    verticalImagesFront.push(loadImage("hippie-flowers-jeff-hobrath.jpg"));
  }

  text3D = new ClickableText("welcome", -70, -200, -400);
  text3D2 = new ClickableText("Use WASD to move", -170, -150, -800);
  text3D3 = new ClickableText(
    "The internet as a visual medium",
    1000,
    -150,
    -400
  );
  text3D4 = new ClickableText(
    "The internet as medium for self portraiture",
    1000,
    -150,
    -400
  );
  text3D5 = new ClickableText("The passive subject", 1000, -150, -400);
  text3D6 = new ClickableText("Describing identity", 1000, -150, -400);
  text3D7 = new ClickableText("Have Fun!", 1000, -150, -400);
}

function draw() {
  background(0);
  handleCameraMovement();
  drawGrid();
  drawAbstractForms();
  drawVerticalImages(currentAngle);
  drawVerticalImages2(currentAngle2);

  if (animateText) {
    // Calculate the new x-position for text3D3, text3D4, text3D5, text3D6, and text3D7

    text3D3.position.y = lerp(text3D3.position.y, -300, 0.1);
    text3D4.position.y = lerp(text3D4.position.y, -200, 0.1);
    text3D5.position.y = lerp(text3D5.position.y, -200, 0.1);
    text3D6.position.y = lerp(text3D6.position.y, -200, 0.1);
    text3D7.position.y = lerp(text3D7.position.y, -200, 0.1);
    text3D3.position.z = lerp(text3D3.position.z, -300, 0.1);
    text3D4.position.z = lerp(text3D4.position.z, -600, 0.1);
    text3D5.position.z = lerp(text3D5.position.z, -600, 0.1);
    text3D6.position.z = lerp(text3D6.position.z, -600, 0.1);
    text3D7.position.z = lerp(text3D7.position.z, -600, 0.1);
  }

  if (animateText2) {
    // Calculate the new x-position for text3D3, text3D4, text3D5, text3D6, and text3D7

    text3D3.position.y = lerp(text3D3.position.y, -300, 0.1);
    text3D4.position.y = lerp(text3D4.position.y, -300, 0.1);
    text3D5.position.y = lerp(text3D5.position.y, -200, 0.1);
    text3D6.position.y = lerp(text3D6.position.y, -200, 0.1);
    text3D7.position.y = lerp(text3D7.position.y, -200, 0.1);

    text3D3.position.z = lerp(text3D3.position.z, -1200, 0.1);
    text3D4.position.z = lerp(text3D4.position.z, -300, 0.1);
    text3D5.position.z = lerp(text3D5.position.z, -600, 0.1);
    text3D6.position.z = lerp(text3D6.position.z, -600, 0.1);
    text3D7.position.z = lerp(text3D7.position.z, -600, 0.1);
  }
  if (animateText3) {
    // Calculate the new x-position for text3D3, text3D4, text3D5, text3D6, and text3D7

    text3D3.position.y = lerp(text3D3.position.y, -300, 0.1);
    text3D4.position.y = lerp(text3D4.position.y, -300, 0.1);
    text3D5.position.y = lerp(text3D5.position.y, -300, 0.1);
    text3D6.position.y = lerp(text3D6.position.y, -200, 0.1);
    text3D7.position.y = lerp(text3D7.position.y, -200, 0.1);

    text3D3.position.z = lerp(text3D3.position.z, -1200, 0.1);
    text3D4.position.z = lerp(text3D4.position.z, -1500, 0.1);
    text3D5.position.z = lerp(text3D5.position.z, -300, 0.1);
    text3D6.position.z = lerp(text3D6.position.z, -600, 0.1);
    text3D7.position.z = lerp(text3D7.position.z, -600, 0.1);
  }

  if (animateText4) {
    // Calculate the new x-position for text3D3, text3D4, text3D5, text3D6, and text3D7

    text3D3.position.y = lerp(text3D3.position.y, -300, 0.1);
    text3D4.position.y = lerp(text3D4.position.y, -300, 0.1);
    text3D5.position.y = lerp(text3D5.position.y, -300, 0.1);
    text3D6.position.y = lerp(text3D6.position.y, -300, 0.1);
    text3D7.position.y = lerp(text3D7.position.y, -200, 0.1);

    text3D3.position.z = lerp(text3D3.position.z, -1200, 0.1);
    text3D4.position.z = lerp(text3D4.position.z, -1500, 0.1);
    text3D5.position.z = lerp(text3D5.position.z, -1800, 0.1);
    text3D6.position.z = lerp(text3D6.position.z, -300, 0.1);
    text3D7.position.z = lerp(text3D7.position.z, -600, 0.1);
  }

  if (animateText5) {
    // Calculate the new x-position for text3D3, text3D4, text3D5, text3D6, and text3D7

    text3D3.position.y = lerp(text3D3.position.y, -300, 0.1);
    text3D4.position.y = lerp(text3D4.position.y, -300, 0.1);
    text3D5.position.y = lerp(text3D5.position.y, -300, 0.1);
    text3D6.position.y = lerp(text3D6.position.y, -300, 0.1);
    text3D7.position.y = lerp(text3D7.position.y, -300, 0.1);

    text3D3.position.z = lerp(text3D3.position.z, -1200, 0.1);
    text3D4.position.z = lerp(text3D4.position.z, -1500, 0.1);
    text3D5.position.z = lerp(text3D5.position.z, -1800, 0.1);
    text3D6.position.z = lerp(text3D6.position.z, -2400, 0.1);
    text3D7.position.z = lerp(text3D7.position.z, -300, 0.1);
  }

  currentAngle = lerp(currentAngle, targetAngle, rotationSpeedf);
  if (isCursorOverPlane()) {
    cursor("pointer");
  } else {
    cursor();
  }
  if (!textClicked) {
    text3D.display();
    text3D2.display();
    text3D3.display2();
    text3D4.display2();
    text3D5.display2();
    text3D6.display2();
    text3D7.display2();
  }
}

function handleCameraMovement() {
  // Move the camera to simulate player movement
  let currentSpeed = sprinting ? sprintSpeed : cameraSpeed;

  // Calculate the forward vector
  let forward = createVector(lookAtX - camX, lookAtY - camY, lookAtZ - camZ)
    .normalize()
    .mult(currentSpeed);

  // Calculate the right vector
  let right = forward
    .copy()
    .cross(createVector(0, 1, 0))
    .normalize()
    .mult(currentSpeed);

  // Calculate the up vector for bobbing
  let up = sin(frameCount * 100);

  if (keyIsDown(87)) {
    // W key (forward)
    camX += forward.x;
    camY += bobAmplitude * sin(frameCount * bobSpeed);
    camZ += forward.z;
    lookAtX += forward.x;
    lookAtZ += forward.z;
    camera.eye += bobAmplitude * sin(frameCount * bobSpeed);
  }
  if (keyIsDown(83)) {
    // S key (backward)
    camX -= forward.x;
    camZ -= forward.z;
    camY += bobAmplitude * sin(frameCount * bobSpeed);
    lookAtX -= forward.x;
    lookAtZ -= forward.z;
    cam.eyeY += up.y;
  }
  if (keyIsDown(65)) {
    // A key (left)
    camX -= right.x;
    camZ -= right.z;
    camY += bobAmplitude * sin(frameCount * bobSpeed);
    lookAtX -= right.x;
    lookAtZ -= right.z;
    cam.eyeY += up.y;
  }
  if (keyIsDown(68)) {
    // D key (right)
    camX += right.x;
    camZ += right.z;
    camY += bobAmplitude * sin(frameCount * bobSpeed);
    lookAtX += right.x;
    lookAtZ += right.z;
    cam.eyeY += up.y;
  }
  if (keyIsDown(16)) {
    // Shift key (sprinting)
    sprinting = true;
  } else {
    sprinting = false;
  }

  cam.setPosition(camX, camY - 200, camZ);
  cam.lookAt(lookAtX, lookAtY, lookAtZ);
}

function keyReleased() {
  if (key === " ") {
    h = h + 1;
    if (h === 1) {
      animateText = !animateText;
    }
    if (h === 2) {
      animateText2 = !animateText2;
    }
    if (h === 3) {
      animateText3 = !animateText3;
    }
    if (h === 4) {
      animateText4 = !animateText4;
    }
    if (h === 5) {
      animateText5 = !animateText5;
    }
    if (h === 6) {
      animateText6 = !animateText6;
    }
  }
}

function mousePressed() {
  // Check if the mouse clicked on the 3D text
  if (text3D.contains(mouseX, mouseY)) {
    textClicked = !textClicked; // Toggle the visibility of the text
  }
}

class ClickableText {
  constructor(text, x, y, z) {
    this.text = text;
    this.position = createVector(x, y, z);
    this.textSize = 30;
    textFont(font);
  }

  display() {
    push();
    translate(this.position);
    rotateX(-HALF_PI);
    rotateX(radians(90)); // Rotate text to face the camera
    textSize(this.textSize);
    fill(255);
    text(this.text, 0, 0);
    pop();
  }

  display2() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    rotateX(-HALF_PI);
    rotateX(radians(90)); // Rotate text to face the camera
    textSize(this.textSize);
    fill(255);
    text(this.text, 0, 0);
    pop();
  }

  contains(x, y) {
    // Check if the mouse coordinates are within the clickable text area
    let textX = width / 2 + this.position.x - textWidth(this.text) / 2;
    let textY = height / 2 + this.position.y - this.textSize / 2;
    return (
      x >= textX &&
      x <= textX + textWidth(this.text) &&
      y >= textY &&
      y <= textY + this.textSize
    );
  }
}

function mouseDragged() {
  // Calculate the change in mouse position
  let dx = mouseX - pmouseX;
  let dy = mouseY - pmouseY;

  // Adjust the camera's look-at position based on mouse movement
  lookAtX += dx * 1; // Adjust the sensitivity as needed for horizontal movement
  lookAtY += dy * 1; // Adjust the sensitivity as needed for vertical movement

  // Ensure that the camera's lookAtY stays within a reasonable range
  lookAtY = constrain(lookAtY, -800, 800);

  // Update the camera's position to match the new look-at position
  cam.lookAt(lookAtX, lookAtY, lookAtZ);

  // Prevent default behavior to avoid selecting text or other elements
  return false;
}

function drawGrid() {
  push(); // Save the current transformation matrix
  rotateX(PI / 2);

  // Draw the grid on the X-Z plane
  let maxRadius = 50 * gridSize;
  for (let x = -maxRadius; x < maxRadius; x += gridSize) {
    for (let z = -maxRadius; z < maxRadius; z += gridSize) {
      let d = dist(x, z, 0, 0);
      let alpha = map(d, 0, maxRadius, 255, 0);
      fill(200, alpha);
      rect(x, z, gridSize, gridSize);
    }
  }

  pop(); // Restore the previous transformation matrix
}

function drawAbstractForms() {
  push();
  translate(
    0,
    map(noise(noiseOffset + -3000 * 0.1), -2000, 1, -2000, -2000),
    map(noise(noiseOffset + -5000 * 0.1), -2000, 1, -3000, -3000)
  ); // Position the abstract forms in the distance

  // Rotate and animate the forms
  rotateY(rotationAngle);
  rotationAngle += rotationSpeed;

  // Draw animated abstract forms
  for (let i = 0; i < 5; i++) {
    let yOffset = map(
      noise(noiseOffset + i * 0.1),
      0,
      1,
      -formAmplitude,
      formAmplitude
    );
    let xOffset = map(
      noise(noiseOffset + 100 + i * 0.1),
      0,
      1,
      -formAmplitude,
      formAmplitude
    );
    let sizeFactor = map(noise(noiseOffset + 200 + i * 0.1), 0, 1, 0.5, 1.5);
    let rotationX = map(noise(noiseOffset + 300 + i * 0.1), 0, 1, 0, TWO_PI);
    let rotationY = map(noise(noiseOffset + 400 + i * 0.1), 0, 1, 0, TWO_PI);
    let rotationZ = map(noise(noiseOffset + 500 + i * 0.1), 0, 1, 0, TWO_PI);

    // Use Perlin noise to create fading in and out effects
    let alpha = map(noise(noiseOffset + 600 + i * 0.1), 0, 1, 0, 255);

    // Smoothly interpolate alpha to create fading effect
    let targetAlpha = 255; // Fully visible
    alpha = lerp(alpha, targetAlpha, fadeSpeed * 0.01);

    translate(xOffset, yOffset, 0);
    rotateX(rotationX);
    rotateY(rotationY);
    rotateZ(rotationZ);

    noStroke(); // Set stroke color with interpolated alpha
    fill(map(noise(noiseOffset + 220 * 0.1), 0, 1, 220, 0), alpha); // Set fill color with interpolated alpha

    let boxSize = formScale * sizeFactor;
    box(boxSize);
  }

  noiseOffset += 0.01; // Increment the noise offset for the next frame
  pop();

  push();
  translate(
    map(noise(noiseOffset + -5000 * 0.1), -2000, 1, -3000, -3000),
    map(noise(noiseOffset + 3000 * 0.1), 2000, 1, 2000, 2000),
    map(noise(noiseOffset + -5000 * 0.1), -2000, 1, -3000, -3000)
  ); // Position the abstract forms in the distance

  // Rotate and animate the forms
  rotateY(rotationAngle);
  rotationAngle += rotationSpeed;

  // Draw animated abstract forms
  for (let i = 0; i < 5; i++) {
    let yOffset = map(
      noise(noiseOffset + i * 0.2),
      0,
      1,
      -formAmplitude,
      formAmplitude
    );
    let xOffset = map(
      noise(noiseOffset + 50000 + i * 0.1),
      0,
      5000,
      -formAmplitude,
      formAmplitude
    );
    let sizeFactor = map(noise(noiseOffset + 200 + i * 0.1), 0, 1, 0.5, 1.5);
    let rotationX = map(noise(noiseOffset + 300 + i * 0.1), 0, 1, 0, TWO_PI);
    let rotationY = map(noise(noiseOffset + 400 + i * 0.1), 0, 1, 0, TWO_PI);
    let rotationZ = map(noise(noiseOffset + 500 + i * 0.1), 0, 1, 0, TWO_PI);

    // Use Perlin noise to create fading in and out effects
    let alpha = map(noise(noiseOffset + 600 + i * 0.1), 0, 1, 0, 100);

    // Smoothly interpolate alpha to create fading effect
    let targetAlpha = 255; // Fully visible
    alpha = lerp(alpha, targetAlpha, fadeSpeed * 0.01);

    translate(xOffset, yOffset, 0);
    rotateX(rotationX);
    rotateY(rotationY);
    rotateZ(rotationZ);

    noStroke(); // Set stroke color with interpolated alpha
    fill(map(noise(noiseOffset + 220 * 0.1), 0, 1, 220, 0), alpha); // Set fill color with interpolated alpha

    let boxSize = formScale * sizeFactor;
    sphere(map(noise(noiseOffset + -600 * 0.1), -600, 1, -1200, -1200));
  }

  noiseOffset += 0.01; // Increment the noise offset for the next frame
  pop();
  push();
  translate(
    4800,
    map(noise(noiseOffset + -3000 * 0.01), -5000, 1, -4000, -2000),
    map(noise(noiseOffset + -5000 * 0.01), 000, 1, 1000, -2000)
  ); // Position the abstract forms in the distance

  // Rotate and animate the forms
  rotateY(rotationAngle);
  rotationAngle += rotationSpeed;

  // Draw animated abstract forms
  for (let i = 0; i < 5; i++) {
    let yOffset = map(
      noise(noiseOffset + i * 0.1),
      0,
      1,
      -formAmplitude,
      formAmplitude
    );
    let xOffset = map(
      noise(noiseOffset + 100 + i * 0.1),
      0,
      1,
      -formAmplitude,
      formAmplitude
    );
    let sizeFactor = map(noise(noiseOffset + 200 + i * 0.1), 0, 1, 0.5, 1.5);
    let rotationX = map(noise(noiseOffset + 300 + i * 0.01), 0, 1, 0, TWO_PI);
    let rotationY = map(noise(noiseOffset + 400 + i * 0.01), 0, 1, 0, TWO_PI);
    let rotationZ = map(noise(noiseOffset + 500 + i * 0.01), 0, 1, 0, TWO_PI);

    // Use Perlin noise to create fading in and out effects
    let alpha = map(noise(noiseOffset + 600 + i * 0.1), 0, 1, 0, 255);

    // Smoothly interpolate alpha to create fading effect
    let targetAlpha = 255; // Fully visible
    alpha = lerp(alpha, targetAlpha, fadeSpeed * 0.01);

    translate(xOffset, yOffset, 0);
    rotateX(rotationX);
    rotateY(rotationY);
    rotateZ(rotationZ);

    noStroke(); // Set stroke color with interpolated alpha
    fill(map(noise(noiseOffset + 220 * 0.1), 0, 1, 220, 0), alpha); // Set fill color with interpolated alpha

    let boxSize = formScale * sizeFactor;
    cone(boxSize);
  }

  noiseOffset += 0.001; // Increment the noise offset for the next frame
  pop();
}

function drawVerticalImages(angle) {
  push();
  noStroke();
  translate(500, -200, 0);

  // Apply the rotation
  rotateY(angle);

  // Front plane with front texture
  beginShape();
  texture(frontTexture);
  plane(frontTexture.width / 10, frontTexture.height / 10);
  endShape(CLOSE);

  // Back plane with back texture
  translate(0, 0, -1); // Move the back plane slightly behind the front plane
  beginShape();
  texture(backTexture);
  plane(frontTexture.width / 10, frontTexture.height / 10);
  endShape(CLOSE);

  pop();
}

function drawVerticalImages2(angle) {
  push();
  noStroke();
  translate(500, -200, -200);

  // Apply the rotation
  rotateY(angle);

  // Front plane with front texture
  beginShape();
  texture(frontTexture);
  plane(frontTexture.width / 10, frontTexture.height / 10);
  endShape(CLOSE);

  // Back plane with back texture
  translate(0, 0, -1); // Move the back plane slightly behind the front plane
  beginShape();
  texture(backTexture);
  plane(frontTexture.width / 10, frontTexture.height / 10);
  endShape(CLOSE);

  pop();
}

function mouseClicked() {
  // When the mouse is clicked, set the target angle to rotate 180 degrees
  if (
    mouseX > 300 &&
    mouseX < 450 && // Check if the click is within the boundaries of the plane
    mouseY > 100 &&
    mouseY < 300
  ) {
    targetAngle += PI; // Set the target angle to rotate 180 degrees
  }

  if (
    mouseX > 600 &&
    mouseX < 750 && // Check if the click is within the boundaries of the plane
    mouseY > 100 &&
    mouseY < 300
  ) {
    targetAngle2 += PI; // Set the target angle to rotate 180 degrees
  }
}

function isCursorOverPlane() {
  // Check if the mouse coordinates are within the plane's boundaries
  const halfWidth = frontTexture.width / 40; // Divide by 2
  const halfHeight = frontTexture.height / 40; // Divide by 2
  const planeX = 300;
  const planeY = -200;

  return (
    mouseX >= planeX - halfWidth &&
    mouseX <= planeX + halfWidth &&
    mouseY >= planeY - halfHeight &&
    mouseY <= planeY + halfHeight
  );
}
