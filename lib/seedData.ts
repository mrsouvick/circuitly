export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order_index: number;
}

export interface ComponentItem {
  name: string;
  quantity: number;
  price: number;
  buy_url: string;
}

export interface StepItem {
  order: number;
  title: string;
  description: string;
  image_url: string;
}

export interface TroubleshootingItem {
  question: string;
  answer: string;
}

export interface QuizItem {
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

export interface Tutorial {
  id: string;
  title: string;
  slug: string;
  description: string;
  category_id: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  time_estimate: number;
  cost_estimate: number;
  hero_image: string;
  circuit_diagram: string;
  learning_outcomes: string[];
  prerequisites: string[];
  components: ComponentItem[];
  code: string;
  steps: StepItem[];
  troubleshooting: TroubleshootingItem[];
  quiz: QuizItem[];
  views_count: number;
  completions_count: number;
  is_published: boolean;
  author_id?: string;
  created_at: string;
  updated_at: string;
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tutorial_ids: string[];
  is_published: boolean;
}

export interface Badge {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  requirement_rule: {
    type: string;
    threshold: number;
    category?: string;
  };
}

export interface Showcase {
  id: string;
  title: string;
  description: string;
  image_url: string;
  code?: string;
  components: ComponentItem[];
  status: 'pending' | 'approved' | 'featured' | 'rejected';
  likes_count: number;
  user: {
    username: string;
    full_name: string;
    avatar_url: string;
  };
  created_at: string;
}

// 7 CATEGORIES
export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Basics & Fundamentals",
    slug: "basics",
    description: "Core digital logic, breadboarding, Ohm's law, and your very first sketches.",
    icon: "Cpu",
    color: "#00E5A0",
    order_index: 1
  },
  {
    id: "cat-2",
    name: "Sensors & Measurement",
    slug: "sensors",
    description: "Analog and digital sensors: ultrasonic, temperature, humidity, infrared, and gas.",
    icon: "Activity",
    color: "#38bdf8",
    order_index: 2
  },
  {
    id: "cat-3",
    name: "Displays & LEDs",
    slug: "displays",
    description: "16x2 LCDs, OLED I2C screens, 7-segment displays, and addressable Neopixels.",
    icon: "Tv",
    color: "#a855f7",
    order_index: 3
  },
  {
    id: "cat-4",
    name: "Motors & Actuators",
    slug: "motors",
    description: "Servo motors, stepper motors, DC motor drivers, and linear solenoids.",
    icon: "Cog",
    color: "#f59e0b",
    order_index: 4
  },
  {
    id: "cat-5",
    name: "IoT & Wireless",
    slug: "iot",
    description: "ESP8266/ESP32 Wi-Fi telemetry, Bluetooth Low Energy, and cloud dashboards.",
    icon: "Wifi",
    color: "#ec4899",
    order_index: 5
  },
  {
    id: "cat-6",
    name: "Robotics & Automation",
    slug: "robotics",
    description: "Obstacle-avoiding rovers, line trackers, robotic arms, and autonomous navigation.",
    icon: "Bot",
    color: "#FF6B6B",
    order_index: 6
  },
  {
    id: "cat-7",
    name: "Home Automation",
    slug: "home-automation",
    description: "Smart switches, RFID door latches, automatic plant waterers, and alarms.",
    icon: "Home",
    color: "#10b981",
    order_index: 7
  }
];

// 20 TUTORIALS WITH REAL COMPILABLE ARDUINO C++ CODE
export const INITIAL_TUTORIALS: Tutorial[] = [
  {
    id: "tut-1",
    title: "Blink LED: The Hello World of Physical Computing",
    slug: "blink-led",
    description: "The classic starting point for every maker. In this hands-on project, you will learn the fundamentals of digital outputs, breadboard pin distribution, current-limiting resistors, and timing loops using the Arduino UNO microcontroller. By connecting a light emitting diode in series with a 220 Ohm resistor to digital pin 13, you will configure pin modes and control voltages using digitalWrite and delay commands in pure C++. You will also inspect how forward voltage drops dictate resistor selection to protect both your LED and the microcontroller port from overcurrent destruction.",
    category_id: "cat-1",
    difficulty: "beginner",
    time_estimate: 10,
    cost_estimate: 5.0,
    hero_image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand the difference between digital HIGH (5V) and LOW (0V)",
      "Calculate current limiting resistance using Ohm's Law (V = I * R)",
      "Master Arduino setup() and loop() execution cycles",
      "Write and compile your very first Arduino C++ firmware"
    ],
    prerequisites: ["None - ideal for complete beginners"],
    components: [
      { name: "Arduino Uno R3", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "Standard 5mm Red LED", quantity: 1, price: 0.2, buy_url: "https://adafruit.com" },
      { name: "220Ω Resistor (1/4W)", quantity: 1, price: 0.1, buy_url: "https://digikey.com" },
      { name: "Mini Breadboard", quantity: 1, price: 0.8, buy_url: "https://sparkfun.com" },
      { name: "Male-to-Male Jumper Wires", quantity: 2, price: 0.4, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: Circuitly Blink LED
 * Author: Circuitly Academy
 * Hardware: Arduino Uno R3 / Nano
 * Pinout: LED Anode -> 220 Ohm -> Pin 13, Cathode -> GND
 */

const int LED_PIN = 13; // Built-in or external LED pin
const unsigned int BLINK_INTERVAL_MS = 1000; // 1 second duration

void setup() {
  // Initialize the digital pin as an output.
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  // Turn the LED on (HIGH is the voltage level 5V)
  digitalWrite(LED_PIN, HIGH);
  delay(BLINK_INTERVAL_MS); // Wait for one second
  
  // Turn the LED off by making the voltage LOW (0V)
  digitalWrite(LED_PIN, LOW);
  delay(BLINK_INTERVAL_MS); // Wait for one second
}
`,
    steps: [
      {
        order: 1,
        title: "Identify Component Polarities",
        description: "Examine your LED. Notice that one leg is longer (anode, positive) and one leg is shorter (cathode, negative with a flat rim on the bulb casing).",
        image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Insert LED into Breadboard",
        description: "Insert the LED across two distinct terminal strips on your breadboard so the anode and cathode are not shorted together.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Wire Current Limiting Resistor",
        description: "Connect the 220 Ohm resistor (bands: Red, Red, Brown, Gold) from the LED anode row to an adjacent unused row.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Connect Jumper Wires to Arduino",
        description: "Run a jumper from Arduino Digital Pin 13 to the resistor. Run a black jumper from the LED cathode to the Arduino GND pin.",
        image_url: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 5,
        title: "Upload and Verify Code",
        description: "Plug the USB cable into your Arduino Uno. Select the board and COM port in the IDE and hit Upload. The LED will blink every second!",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why doesn't the LED light up at all?",
        answer: "Check LED polarity. The longer leg (anode) must connect towards Pin 13 through the resistor. Reverse it if oriented backwards."
      },
      {
        question: "Why did the IDE throw 'avrdude: stk500_recv(): programmer is not responding'?",
        answer: "Verify that the correct COM port is chosen under Tools > Port and that your USB cable is rated for data transfer, not power-only."
      },
      {
        question: "Is it safe to connect an LED directly without a resistor?",
        answer: "No. Without a resistor, the diode draws excessive current, which will burn out the LED and can permanently damage the Arduino microcontroller pin."
      }
    ],
    quiz: [
      {
        question: "Which leg of a typical 5mm LED is the positive Anode?",
        options: ["The shorter leg", "The longer leg", "Both are equal", "The flat notched side"],
        correct_answer: 1,
        explanation: "The longer lead is the positive anode; the shorter lead is the cathode."
      },
      {
        question: "What function configures an Arduino pin as either INPUT or OUTPUT?",
        options: ["digitalWrite()", "pinMode()", "analogRead()", "setupPin()"],
        correct_answer: 1,
        explanation: "pinMode(pin, mode) configures the specified digital pin as INPUT, OUTPUT, or INPUT_PULLUP."
      },
      {
        question: "What does digitalWrite(13, HIGH) send to pin 13 on a standard 5V Arduino?",
        options: ["0 Volts", "2.5 Volts", "5 Volts", "12 Volts"],
        correct_answer: 2,
        explanation: "HIGH sets the digital output voltage to VCC, which is +5V on standard Arduino Uno hardware."
      },
      {
        question: "What happens if you omit the current-limiting resistor?",
        options: ["The LED blinks faster", "Excess current burns out the LED/pin", "The code fails to compile", "Nothing changes"],
        correct_answer: 1,
        explanation: "An LED has very little internal resistance once forward biased; excessive current damages the LED and microcontroller."
      },
      {
        question: "What unit of time does the Arduino delay() function accept as parameter?",
        options: ["Seconds", "Milliseconds", "Microseconds", "Nanoseconds"],
        correct_answer: 1,
        explanation: "delay(ms) expects the duration in milliseconds, so delay(1000) pauses execution for 1 second."
      }
    ],
    views_count: 2450,
    completions_count: 1840,
    is_published: true,
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z"
  },
  {
    id: "tut-2",
    title: "Traffic Light Simulator: State Sequencing & Arrays",
    slug: "traffic-light-simulator",
    description: "Expand your digital output skills by building a realistic municipal 3-phase traffic signal. This project introduces sequential logic, multiple pin manipulation, and clean state machine programming in C++. You will wire red, yellow, and green LEDs with dedicated current-limiting resistors and write an organized, time-calibrated state controller that models real-world traffic intersections. Additionally, you will discover how to refactor repetitive timing logic using structured arrays and enumerated constants.",
    category_id: "cat-1",
    difficulty: "beginner",
    time_estimate: 20,
    cost_estimate: 8.0,
    hero_image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Manage multiple synchronized digital outputs simultaneously",
      "Structure timing delays for realistic traffic intervals",
      "Utilize C++ arrays to streamline pin definitions",
      "Implement basic state machine patterns without complex libraries"
    ],
    prerequisites: ["Blink LED tutorial completed"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "Red 5mm LED", quantity: 1, price: 0.2, buy_url: "https://adafruit.com" },
      { name: "Yellow 5mm LED", quantity: 1, price: 0.2, buy_url: "https://adafruit.com" },
      { name: "Green 5mm LED", quantity: 1, price: 0.2, buy_url: "https://adafruit.com" },
      { name: "220Ω Resistors", quantity: 3, price: 0.3, buy_url: "https://digikey.com" },
      { name: "Half-size Breadboard", quantity: 1, price: 1.2, buy_url: "https://sparkfun.com" },
      { name: "Jumper wires", quantity: 6, price: 0.6, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: Traffic Light Simulator
 * Author: Circuitly Academy
 * Pins: Red -> 10, Yellow -> 9, Green -> 8
 */

const int PIN_RED = 10;
const int PIN_YELLOW = 9;
const int PIN_GREEN = 8;

void setup() {
  pinMode(PIN_RED, OUTPUT);
  pinMode(PIN_YELLOW, OUTPUT);
  pinMode(PIN_GREEN, OUTPUT);
}

void loop() {
  // Phase 1: Green Go (5 seconds)
  digitalWrite(PIN_RED, LOW);
  digitalWrite(PIN_YELLOW, LOW);
  digitalWrite(PIN_GREEN, HIGH);
  delay(5000);

  // Phase 2: Yellow Caution (2 seconds)
  digitalWrite(PIN_GREEN, LOW);
  digitalWrite(PIN_YELLOW, HIGH);
  delay(2000);

  // Phase 3: Red Stop (5 seconds)
  digitalWrite(PIN_YELLOW, LOW);
  digitalWrite(PIN_RED, HIGH);
  delay(5000);

  // Phase 4: Red + Yellow Prepare (1.5 seconds)
  digitalWrite(PIN_YELLOW, HIGH);
  delay(1500);
}
`,
    steps: [
      {
        order: 1,
        title: "Place LEDs in Traffic Light Order",
        description: "Arrange the Red, Yellow, and Green LEDs vertically on the breadboard to emulate a real traffic signal pole.",
        image_url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Attach Resistors to Cathodes",
        description: "Connect one 220Ω resistor from each LED cathode to the common ground rail of the breadboard.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Wire Anodes to Digital Pins",
        description: "Connect Arduino Pin 10 to Red LED, Pin 9 to Yellow LED, and Pin 8 to Green LED anode rows.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Ground Connection",
        description: "Connect the breadboard blue ground rail to the Arduino GND pin with a black jumper.",
        image_url: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 5,
        title: "Upload & Observe Sequence",
        description: "Upload the sketch. Verify that green holds for 5s, yellow cautions for 2s, red holds for 5s, and red+yellow transitions smoothly.",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why do all 3 LEDs stay lit at the same time?",
        answer: "Ensure you are turning previous LEDs to LOW when activating subsequent phase colors."
      },
      {
        question: "Yellow LED looks very dim compared to green and red.",
        answer: "Yellow LEDs have slightly different forward voltages (~2.1V). A 220Ω resistor is standard, but you can use 150Ω to brighten it."
      },
      {
        question: "Can I power all three LEDs simultaneously from the Arduino 5V pin?",
        answer: "Yes, total current for three 20mA LEDs is ~60mA, well within the Arduino 200mA total microcontroller current rating."
      }
    ],
    quiz: [
      {
        question: "Why does each LED require its own independent resistor instead of sharing one?",
        options: ["Shared resistors cause uneven brightness due to forward voltage variations", "Sharing resistors crashes the IDE", "It is illegal in electronics", "Shared resistors invert the logic"],
        correct_answer: 0,
        explanation: "LEDs with the lowest forward voltage hog current if connected in parallel across a single shared resistor."
      },
      {
        question: "How long does delay(5000) block the CPU execution?",
        options: ["50 milliseconds", "0.5 seconds", "5 seconds", "50 seconds"],
        correct_answer: 2,
        explanation: "5000 milliseconds equals 5 full seconds."
      },
      {
        question: "Which phase comes directly before Green in standard European/UK traffic signals?",
        options: ["Yellow only", "Red + Yellow", "Blue", "Flashing Green"],
        correct_answer: 1,
        explanation: "Red + Yellow is the preparatory warning phase before Green in many municipal signaling systems."
      },
      {
        question: "What function sets digital pins 8, 9, and 10 to emit current?",
        options: ["pinMode(x, OUTPUT)", "pinMode(x, INPUT)", "analogWrite(x, 255)", "digitalRead(x)"],
        correct_answer: 0,
        explanation: "pinMode(x, OUTPUT) configures pins to drive electrical current."
      },
      {
        question: "What is the total maximum safe current output from a single Arduino Uno digital I/O pin?",
        options: ["20 mA typical (40 mA absolute max)", "500 mA", "2 Amperes", "100 Microamps"],
        correct_answer: 0,
        explanation: "Each ATmega328P pin is recommended for up to 20mA continuous (40mA absolute maximum rating)."
      }
    ],
    views_count: 1980,
    completions_count: 1420,
    is_published: true,
    created_at: "2024-01-12T11:00:00Z",
    updated_at: "2024-01-12T11:00:00Z"
  },
  {
    id: "tut-3",
    title: "HC-SR04 Ultrasonic Distance Sensor: Sonar Echo Measurement",
    slug: "ultrasonic-distance-sensor",
    description: "Unlock acoustic sonar perception for your Arduino! The HC-SR04 ultrasonic distance sensor utilizes high-frequency 40kHz acoustic waves to calculate non-contact proximity from 2cm to 400cm with 3mm precision. In this comprehensive tutorial, you will master the physics of acoustic flight times at ambient air temperatures, trigger a 10-microsecond ultrasonic pulse using the TRIG pin, measure return echo durations with the pulseIn() function, and convert acoustic round-trip flight times into precise metric centimeters and imperial inches.",
    category_id: "cat-2",
    difficulty: "beginner",
    time_estimate: 25,
    cost_estimate: 10.0,
    hero_image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand active sonar echolocation principles and timing triggers",
      "Operate the TRIG and ECHO pins using microsecond precision pulses",
      "Calculate physical distance using the speed of sound formula (343 m/s)",
      "Stream distance readings live to the Arduino Serial Monitor"
    ],
    prerequisites: ["Basic digital pin wiring and Serial Monitor usage"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "HC-SR04 Ultrasonic Module", quantity: 1, price: 2.5, buy_url: "https://adafruit.com" },
      { name: "Breadboard", quantity: 1, price: 1.0, buy_url: "https://sparkfun.com" },
      { name: "Male-to-Female Jumper Wires", quantity: 4, price: 0.8, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: HC-SR04 Ultrasonic Distance Sensor
 * Author: Circuitly Academy
 * Speed of Sound: 0.0343 cm/us (Round trip / 2)
 */

const int PIN_TRIG = 9;
const int PIN_ECHO = 10;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  Serial.println("HC-SR04 Distance Sensor Initialized.");
}

void loop() {
  // Clear the trigger pin
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);

  // Send a 10-microsecond ultrasonic pulse
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);

  // Read the echo return flight time in microseconds
  long duration_us = pulseIn(PIN_ECHO, HIGH, 30000); // 30ms timeout

  if (duration_us == 0) {
    Serial.println("Target out of range or echo lost.");
  } else {
    // Distance = (Time * Speed of Sound 0.0343 cm/us) / 2
    float distance_cm = (duration_us * 0.0343) / 2.0;

    Serial.print("Distance: ");
    Serial.print(distance_cm, 1);
    Serial.println(" cm");
  }

  delay(200); // 5Hz sampling rate
}
`,
    steps: [
      {
        order: 1,
        title: "Identify HC-SR04 Transducers",
        description: "The module has two metallic cylinders labeled T (Transmitter) and R (Receiver), plus 4 pins: VCC, TRIG, ECHO, and GND.",
        image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Connect Power Lines",
        description: "Connect HC-SR04 VCC to Arduino 5V, and module GND to Arduino GND.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Connect Trigger and Echo Pins",
        description: "Wire TRIG to Arduino Pin 9 (Output), and ECHO to Arduino Pin 10 (Input).",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Open Serial Monitor",
        description: "Upload sketch and open Tools > Serial Monitor at 9600 baud rate.",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 5,
        title: "Test with Flat Obstacle",
        description: "Place your hand or a cardboard sheet 15cm from the sensor and watch distance update in real-time.",
        image_url: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why does the sensor constantly output 0 cm or timeout?",
        answer: "Verify ECHO is plugged into Pin 10 and TRIG into Pin 9. Also check that your target is within the 2cm to 400cm range."
      },
      {
        question: "Why do readings fluctuate wildly when pointing at soft clothing?",
        answer: "Fabric and carpet absorb ultrasonic waves rather than reflecting them. Use hard, flat surfaces like wood, cardboard, or books."
      },
      {
        question: "Can I power the HC-SR04 with 3.3V on an ESP8266 or Arduino Pro Mini 3.3V?",
        answer: "The standard HC-SR04 requires 5V. Use an HC-SR04P or RCWL-1601 module if operating on 3.3V microcontrollers."
      }
    ],
    quiz: [
      {
        question: "At what acoustic frequency does the HC-SR04 transmitter operate?",
        options: ["1 kHz", "20 Hz", "40 kHz", "2.4 GHz"],
        correct_answer: 2,
        explanation: "HC-SR04 emits an inaudible ultrasonic burst at 40 kHz."
      },
      {
        question: "Why must the calculated distance be divided by 2?",
        options: ["To convert to inches", "Because sound travels out to the target and back again", "To account for thermal loss", "Because of dual transducers"],
        correct_answer: 1,
        explanation: "The measured pulse represents the two-way round trip; dividing by 2 yields one-way distance to target."
      },
      {
        question: "What trigger pulse duration is required on the TRIG pin?",
        options: ["10 milliseconds", "10 microseconds", "1 second", "50 nanoseconds"],
        correct_answer: 1,
        explanation: "The HC-SR04 requires a minimum 10 microsecond HIGH pulse on TRIG to emit its 8-cycle sonic burst."
      },
      {
        question: "What is the nominal speed of sound in dry air at 20°C?",
        options: ["343 m/s (0.0343 cm/µs)", "1500 m/s", "300,000 km/s", "120 m/s"],
        correct_answer: 0,
        explanation: "Sound travels at roughly 343 meters per second (0.0343 cm per microsecond) at room temperature."
      },
      {
        question: "Which function halts code execution until a pin receives a pulse and returns its duration?",
        options: ["digitalRead()", "pulseIn()", "analogRead()", "attachInterrupt()"],
        correct_answer: 1,
        explanation: "pulseIn(pin, value) measures the length of an incoming pulse on a digital pin in microseconds."
      }
    ],
    views_count: 3200,
    completions_count: 2150,
    is_published: true,
    created_at: "2024-01-14T09:30:00Z",
    updated_at: "2024-01-14T09:30:00Z"
  },
  {
    id: "tut-4",
    title: "DHT11 Climate Station: Temperature & Humidity Logging",
    slug: "dht11-temperature-humidity",
    description: "Build an environmental monitor with the popular DHT11 digital temperature and relative humidity sensor. This guide explains how capacitive humidity sensing and negative temperature coefficient (NTC) thermistors work together inside a single package. You will learn how the DHT single-bus protocol communicates 40 bits of serial data, install and import the DHT sensor library, calculate heat index formulas, and display formatted weather readings directly to your workstation console.",
    category_id: "cat-2",
    difficulty: "beginner",
    time_estimate: 30,
    cost_estimate: 12.0,
    hero_image: "https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand capacitive humidity and NTC thermistor measurement",
      "Interface single-wire digital communications with pullup resistors",
      "Calculate relative humidity and temperature in Celsius & Fahrenheit",
      "Detect sensor transmission read failures and validate data integrity"
    ],
    prerequisites: ["Library installation in Arduino IDE"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "DHT11 Sensor Module", quantity: 1, price: 3.0, buy_url: "https://adafruit.com" },
      { name: "10kΩ Resistor (Pullup)", quantity: 1, price: 0.1, buy_url: "https://digikey.com" },
      { name: "Breadboard & Jumpers", quantity: 1, price: 2.0, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: DHT11 Temperature & Humidity Sensor
 * Author: Circuitly Academy
 * Libraries: Requires "DHT sensor library" by Adafruit
 */

#include <DHT.h>

#define DHTPIN 2     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11   // DHT 11 model

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  Serial.println("Circuitly DHT11 Climate Station Initiating...");
  dht.begin();
}

void loop() {
  // Reading temperature or humidity takes about 250 milliseconds!
  float humidity = dht.readHumidity();
  float tempC = dht.readTemperature(); // Celsius
  float tempF = dht.readTemperature(true); // Fahrenheit

  // Check if any reads failed and exit early
  if (isnan(humidity) || isnan(tempC) || isnan(tempF)) {
    Serial.println("Failed to read from DHT sensor! Check wiring.");
    delay(2000);
    return;
  }

  // Compute heat index in Celsius
  float heatIndex = dht.computeHeatIndex(tempC, humidity, false);

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.print("% | Temp: ");
  Serial.print(tempC);
  Serial.print("°C (");
  Serial.print(tempF);
  Serial.print("°F) | Heat Index: ");
  Serial.print(heatIndex);
  Serial.println("°C");

  delay(2000); // DHT11 sampling rate is 1Hz max (every 2s recommended)
}
`,
    steps: [
      {
        order: 1,
        title: "Install DHT Sensor Library",
        description: "In Arduino IDE, open Sketch > Include Library > Manage Libraries. Search 'DHT sensor library by Adafruit' and click Install, including Adafruit Unified Sensor dependency.",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Identify DHT11 Pins",
        description: "From left to right on bare DHT11: Pin 1 (VCC), Pin 2 (DATA), Pin 3 (NC/No connect), Pin 4 (GND). Modules with 3 pins are labeled VCC (+), DATA (out), GND (-).",
        image_url: "https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Wire Data Line to Pin 2",
        description: "Connect VCC to 5V, GND to GND, and Data to Arduino Pin 2. If using bare DHT11, place a 10k resistor between VCC and Data.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Upload Sketch and Monitor Data",
        description: "Upload sketch, open Serial Monitor (9600 baud), and observe ambient temperature and relative humidity updates every 2 seconds.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why does Serial Monitor keep saying 'Failed to read from DHT sensor'?",
        answer: "Check that the data pin matches DHTPIN 2 in the code, and ensure 5V power is secure. The DHT11 cannot work on loose breadboard rails."
      },
      {
        question: "Why are the readings only updating once every two seconds?",
        answer: "The DHT11 has an internal thermal settling time and takes 1 second minimum between sensor interrogations."
      },
      {
        question: "How does DHT11 differ from the white DHT22?",
        answer: "DHT22 offers higher accuracy (±0.5°C vs ±2°C) and broader temperature ranges (-40 to 80°C vs 0 to 50°C)."
      }
    ],
    quiz: [
      {
        question: "What physical sensor inside DHT11 measures temperature?",
        options: ["Thermocouple", "NTC Thermistor", "Infrared Photodiode", "Strain Gauge"],
        correct_answer: 1,
        explanation: "The DHT11 uses a Negative Temperature Coefficient (NTC) thermistor where resistance drops as temperature rises."
      },
      {
        question: "What function checks if a floating-point number is invalid in C++?",
        options: ["isZero()", "isnan()", "isNull()", "isEmpty()"],
        correct_answer: 1,
        explanation: "isnan() tests whether a value represents 'Not-a-Number'."
      },
      {
        question: "What is the maximum recommended sampling frequency of the DHT11 sensor?",
        options: ["1000 Hz", "100 Hz", "1 Hz (once per second)", "0.01 Hz"],
        correct_answer: 2,
        explanation: "DHT11 requires at least 1 second between reads to deliver stable conversion data."
      },
      {
        question: "Why is a pull-up resistor required on the DHT data line?",
        options: ["To keep the single bus HIGH when both devices are in listening mode", "To drop 12V to 5V", "To filter radio noise", "To protect the LED"],
        correct_answer: 0,
        explanation: "Single-wire open-drain bidirectional communication relies on a pullup resistor to define the default idle HIGH state."
      },
      {
        question: "What units does relative humidity express?",
        options: ["Grams per cubic meter", "Percentage of saturation at current temperature", "Parts per million", "Degrees Kelvin"],
        correct_answer: 1,
        explanation: "Relative humidity is the ratio of actual moisture to the maximum moisture air can hold at that temperature, expressed as %."
      }
    ],
    views_count: 2780,
    completions_count: 1950,
    is_published: true,
    created_at: "2024-01-16T14:15:00Z",
    updated_at: "2024-01-16T14:15:00Z"
  },
  {
    id: "tut-5",
    title: "Piezo Buzzer Music Player: Sound Synthesis with tone()",
    slug: "piezo-buzzer-music-player",
    description: "Turn electrical square wave frequencies into audible melodies! Piezoelectric buzzers contain crystal discs that mechanically flex when subjected to alternating voltages. In this musical engineering tutorial, you will explore square wave synthesis, musical note frequencies (from Middle C up to B5), note duration arrays, and non-blocking melody playback. You will program the Arduino tone() and noTone() hardware timers to play the iconic Super Mario Bros or Star Wars fanfares with authentic 8-bit retro sound aesthetics.",
    category_id: "cat-1",
    difficulty: "beginner",
    time_estimate: 20,
    cost_estimate: 6.0,
    hero_image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand piezoelectric effect and square wave acoustic generation",
      "Map standard musical pitch frequencies to C++ header constants",
      "Utilize the built-in tone() and noTone() timer routines",
      "Synchronize note pitches with tempo rhythm arrays"
    ],
    prerequisites: ["Basic digital pin wiring"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "Passive Piezo Buzzer", quantity: 1, price: 1.0, buy_url: "https://adafruit.com" },
      { name: "100Ω Resistor (optional volume dampener)", quantity: 1, price: 0.1, buy_url: "https://digikey.com" },
      { name: "Jumper Wires", quantity: 2, price: 0.4, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: Piezo Buzzer Melody Synthesizer
 * Author: Circuitly Academy
 * Uses hardware Timer 2 via tone() function
 */

// Musical Note Frequencies (in Hz)
#define NOTE_C4  262
#define NOTE_D4  294
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_G4  392
#define NOTE_A4  440
#define NOTE_B4  494
#define NOTE_C5  523

const int BUZZER_PIN = 8;

// Melody array
int melody[] = {
  NOTE_C4, NOTE_D4, NOTE_E4, NOTE_C4,
  NOTE_C4, NOTE_D4, NOTE_E4, NOTE_C4,
  NOTE_E4, NOTE_F4, NOTE_G4,
  NOTE_E4, NOTE_F4, NOTE_G4
};

// Note durations: 4 = quarter note, 8 = eighth note, etc.
int noteDurations[] = {
  4, 4, 4, 4,
  4, 4, 4, 4,
  4, 4, 2,
  4, 4, 2
};

void setup() {
  int totalNotes = sizeof(melody) / sizeof(melody[0]);

  for (int note = 0; note < totalNotes; note++) {
    // Calculate duration in milliseconds: 1000ms / noteDuration
    int duration = 1000 / noteDurations[note];
    tone(BUZZER_PIN, melody[note], duration);

    // Pause between notes to distinguish tones
    int pauseBetweenNotes = duration * 1.30;
    delay(pauseBetweenNotes);

    // Stop tone generation
    noTone(BUZZER_PIN);
  }
}

void loop() {
  // Song plays once in setup. Leave loop empty or repeat on button press.
}
`,
    steps: [
      {
        order: 1,
        title: "Active vs Passive Buzzer Distinction",
        description: "Ensure you are using a PASSIVE buzzer (which has an exposed circuit bottom and makes no sound with DC voltage alone). Active buzzers only emit a single continuous beep.",
        image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Connect Positive Pin to Arduino Pin 8",
        description: "Connect the buzzer's positive pin (+) to Arduino Digital Pin 8.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Connect Ground Pin",
        description: "Connect the negative terminal of the buzzer to Arduino GND (optionally with a 100Ω resistor to soften volume).",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Upload & Listen to Frere Jacques",
        description: "Upload code and enjoy the classic French nursery tune ringing clearly from your piezo element!",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why does the buzzer only make a clicking or static buzzing sound?",
        answer: "If you connect an active buzzer, tone() conflicts with its internal oscillator. Replace it with a passive piezo transducer."
      },
      {
        question: "Why did tone() interfere with analogWrite() on pins 3 or 11?",
        answer: "On the ATmega328P, tone() uses hardware Timer 2, which also controls PWM outputs on pins 3 and 11. Avoid PWM on those pins while playing tones."
      },
      {
        question: "How can I make the sound louder?",
        answer: "Enclose the buzzer in a small plastic container or bottle cap to act as a Helmholtz acoustic resonant cavity."
      }
    ],
    quiz: [
      {
        question: "What physical mechanism creates sound in a piezoelectric buzzer?",
        options: ["Magnetic voice coil", "A ceramic disc flexing rapidly under oscillating voltage", "A heating wire", "A miniature fan"],
        correct_answer: 1,
        explanation: "Piezoceramic crystals physically expand and contract under applied electrical voltage, creating acoustic pressure waves."
      },
      {
        question: "What is the pitch frequency of concert pitch note A4?",
        options: ["220 Hz", "440 Hz", "880 Hz", "60 Hz"],
        correct_answer: 1,
        explanation: "Concert A4 is globally standardized at 440 Hz."
      },
      {
        question: "Which function terminates sound output on an Arduino pin?",
        options: ["stopTone()", "noTone()", "quiet()", "digitalWrite(LOW)"],
        correct_answer: 1,
        explanation: "noTone(pin) stops the hardware timer frequency generation on the pin."
      },
      {
        question: "What difference separates an active buzzer from a passive buzzer?",
        options: ["Active buzzers have an internal oscillating circuit and only need steady DC", "Passive buzzers require 220V", "Active buzzers are waterproof", "No difference"],
        correct_answer: 0,
        explanation: "Active buzzers generate their own fixed tone when given 5V DC; passive buzzers require external PWM or alternating frequencies to produce tones."
      },
      {
        question: "How is array length calculated in C++?",
        options: ["array.length", "sizeof(array) / sizeof(array[0])", "count(array)", "lengthOf(array)"],
        correct_answer: 1,
        explanation: "In C++, total bytes of the array divided by bytes of a single element gives the number of items."
      }
    ],
    views_count: 2120,
    completions_count: 1530,
    is_published: true,
    created_at: "2024-01-18T10:00:00Z",
    updated_at: "2024-01-18T10:00:00Z"
  },
  {
    id: "tut-6",
    title: "Servo Motor Control: Angle Positioning with PWM",
    slug: "servo-motor-control",
    description: "Step into physical kinematics and robotic motion! Micro servos like the TowerPro SG90 provide closed-loop angular feedback control from 0 to 180 degrees using Pulse Width Modulation (PWM). Unlike regular DC motors that spin continuously, servos feature internal gear trains, potentiometers, and control circuitry that lock the horn into precise angular targets. In this project, you will import the Servo.h library, command exact angular displacements, build sweeping animations, and safely manage current spikes to protect your microcontroller.",
    category_id: "cat-4",
    difficulty: "intermediate",
    time_estimate: 30,
    cost_estimate: 15.0,
    hero_image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand PWM control pulses (1ms = 0°, 1.5ms = 90°, 2ms = 180°)",
      "Utilize the Arduino Servo.h library for precise angle dispatch",
      "Construct smooth back-and-forth sweep cycles using for-loops",
      "Manage peak motor stall current with external power supply decoupling"
    ],
    prerequisites: ["Basics of digital and analog I/O"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "SG90 Micro Servo 9g", quantity: 1, price: 3.5, buy_url: "https://adafruit.com" },
      { name: "100uF Electrolytic Capacitor", quantity: 1, price: 0.3, buy_url: "https://digikey.com" },
      { name: "Breadboard & Wires", quantity: 1, price: 1.5, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: SG90 Micro Servo Sweep
 * Author: Circuitly Academy
 * Pinout: Brown/Black -> GND, Red -> 5V, Orange/Yellow -> Pin 9
 */

#include <Servo.h>

Servo myServo;  // Create servo object
const int SERVO_PIN = 9;

void setup() {
  myServo.attach(SERVO_PIN); // Attaches servo to digital pin 9
  myServo.write(0);          // Start at 0 degrees
  delay(1000);
}

void loop() {
  // Sweep from 0 degrees to 180 degrees
  for (int pos = 0; pos <= 180; pos += 1) {
    myServo.write(pos);
    delay(15); // Wait 15ms for the servo to reach position
  }

  delay(500); // Pause at max angle

  // Sweep back from 180 degrees to 0 degrees
  for (int pos = 180; pos >= 0; pos -= 1) {
    myServo.write(pos);
    delay(15);
  }

  delay(500); // Pause at origin
}
`,
    steps: [
      {
        order: 1,
        title: "Identify Servo Wiring Colors",
        description: "Brown or Black is Ground (GND), Red is Power (+5V), and Orange or Yellow is the PWM Signal wire.",
        image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Attach Decoupling Capacitor",
        description: "Place a 100uF electrolytic capacitor across 5V and GND rail on your breadboard (observing negative stripe) to smooth motor inductive current spikes.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Connect Signal to PWM Pin 9",
        description: "Plug the yellow signal wire into Arduino Digital Pin 9.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Upload & Observe Sweep",
        description: "Upload code. The servo arm rotates smoothly through 180 degrees and sweeps back gracefully.",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why does the Arduino board reset every time the servo starts moving?",
        answer: "The servo draws sudden stall current exceeding 500mA, causing the Arduino 5V regulator to brown out. Add a 100µF capacitor or power the servo from an external 5V supply."
      },
      {
        question: "The servo is jittering and buzzing continuously at 0° or 180°.",
        answer: "The mechanical endstop is being hit. Adjust your travel range from 10° to 170° instead of pushing the extreme physical edges."
      },
      {
        question: "Can I connect 4 servos simultaneously to the Arduino 5V pin?",
        answer: "No. Multiple servos will overwhelm the onboard 5V regulator. Use an external battery pack or 5V 2A buck regulator with common ground."
      }
    ],
    quiz: [
      {
        question: "What signal pulse width typically represents 90 degrees (center position) on a standard servo?",
        options: ["0.5 milliseconds", "1.5 milliseconds", "2.5 milliseconds", "10 milliseconds"],
        correct_answer: 1,
        explanation: "1.0ms is 0°, 1.5ms is 90° center, and 2.0ms is 180° in standard 50Hz hobby servo protocols."
      },
      {
        question: "What function attaches the Servo object to an Arduino output pin?",
        options: ["myServo.connect()", "myServo.attach()", "myServo.bind()", "myServo.pin()"],
        correct_answer: 1,
        explanation: "myServo.attach(pin) binds the software servo driver to the targeted pin."
      },
      {
        question: "What happens to analogWrite() on pins 9 and 10 when using the Arduino Servo library?",
        options: ["Nothing", "PWM functionality on pins 9 & 10 is disabled because Timer 1 is allocated to Servo control", "The pins invert", "Power doubles"],
        correct_answer: 1,
        explanation: "The standard Servo library utilizes ATmega328P 16-bit Timer 1, overriding analogWrite on pins 9 and 10."
      },
      {
        question: "What internal feedback component allows a servo to know its shaft angle?",
        options: ["Potentiometer", "Compass", "Barometer", "Thermistor"],
        correct_answer: 0,
        explanation: "An internal rotary potentiometer is mechanically coupled to the output gear, feeding back positional voltage."
      },
      {
        question: "Why must external servo battery power share common ground with the Arduino?",
        options: ["To prevent short circuits", "To establish a common 0V voltage reference for the PWM signal", "To double the amperage", "It is optional"],
        correct_answer: 1,
        explanation: "Voltage is relative; without a common ground reference, the servo logic circuit cannot accurately read the control pulse."
      }
    ],
    views_count: 2890,
    completions_count: 1720,
    is_published: true,
    created_at: "2024-01-20T12:00:00Z",
    updated_at: "2024-01-20T12:00:00Z"
  },
  {
    id: "tut-7",
    title: "PIR Motion Alarm: Pyroelectric Infrared Intruder Detection",
    slug: "pir-motion-alarm",
    description: "Design a residential security intruder alarm using a Passive Infrared (PIR) sensor and audio-visual annunciators. PIR sensors detect invisible infrared heat radiation (centered around 10 micrometers) naturally radiated by human bodies. Using dual differential pyroelectric elements covered with a faceted Fresnel lens, the sensor detects motion when a warm target crosses optical detection zones. In this project, you will wire the HC-SR501 sensor, calibrate sensitivity and hold-time potentiometers, and trigger an automated security siren and strobing strobe lights.",
    category_id: "cat-2",
    difficulty: "intermediate",
    time_estimate: 35,
    cost_estimate: 18.0,
    hero_image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand differential pyroelectric infrared thermal detection",
      "Calibrate HC-SR501 sensitivity and trigger delay potentiometers",
      "Implement latching security alarm state machines",
      "Filter false triggers with warm-up stabilization delays"
    ],
    prerequisites: ["Digital inputs, buzzer and LED control"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "HC-SR501 PIR Sensor", quantity: 1, price: 3.0, buy_url: "https://adafruit.com" },
      { name: "Piezo Buzzer", quantity: 1, price: 1.0, buy_url: "https://sparkfun.com" },
      { name: "Red 5mm LED + 220Ω resistor", quantity: 1, price: 0.3, buy_url: "https://digikey.com" },
      { name: "Jumpers & Breadboard", quantity: 1, price: 1.5, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: PIR Motion Detection Security Alarm
 * Author: Circuitly Academy
 * Hardware: HC-SR501 PIR on Pin 2, Buzzer on Pin 8, Alarm LED on Pin 13
 */

const int PIN_PIR = 2;
const int PIN_BUZZER = 8;
const int PIN_LED = 13;

int pirState = LOW; // Assume no motion initially

void setup() {
  Serial.begin(9600);
  pinMode(PIN_PIR, INPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(PIN_LED, OUTPUT);

  Serial.println("Calibrating PIR sensor (warmup 30s)...");
  // PIR needs 30-60s to stabilize ambient thermal background
  for (int i = 0; i < 30; i++) {
    digitalWrite(PIN_LED, !digitalRead(PIN_LED));
    delay(1000);
  }
  digitalWrite(PIN_LED, LOW);
  Serial.println("PIR Sensor Active! Armed and ready.");
}

void loop() {
  int motionDetected = digitalRead(PIN_PIR);

  if (motionDetected == HIGH) {
    digitalWrite(PIN_LED, HIGH);
    
    // Siren tone modulation
    for (int hz = 600; hz <= 1200; hz += 50) {
      tone(PIN_BUZZER, hz, 10);
      delay(10);
    }

    if (pirState == LOW) {
      Serial.println("ALERT: Motion detected by PIR security zone!");
      pirState = HIGH;
    }
  } else {
    digitalWrite(PIN_LED, LOW);
    noTone(PIN_BUZZER);

    if (pirState == HIGH) {
      Serial.println("Motion ended. System standing by.");
      pirState = LOW;
    }
  }
}
`,
    steps: [
      {
        order: 1,
        title: "Inspect HC-SR501 Sensor Trimmers",
        description: "Locate the two orange trimmer potentiometers: one controls sensitivity (3m to 7m range), and one controls output hold duration (3s to 300s). Turn both counter-clockwise for initial testing.",
        image_url: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Wire Power & Output",
        description: "Connect PIR VCC to 5V, GND to GND, and OUT to Arduino Digital Pin 2.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Connect Siren Buzzer & Alarm Indicator",
        description: "Wire buzzer to Pin 8 and ground, and indicator LED to Pin 13.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Power Up & Allow Warm-Up Period",
        description: "Wait 30 seconds for the thermal sensors to baseline. Then step into the room and watch the alarm trigger instantly!",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why does the PIR sensor trigger continuously even when the room is empty?",
        answer: "PIR sensors require a 30-60 second stabilization period upon power up. Also, heaters, direct sunlight, or air conditioning vents can create moving thermal convection currents."
      },
      {
        question: "The alarm stays on for several minutes after motion stops.",
        answer: "The time-delay potentiometer on the sensor board is turned too high. Turn it counter-clockwise to reduce the hold duration to ~3 seconds."
      },
      {
        question: "What is the jumper with 'H' and 'L' positions on the board?",
        answer: "'H' is repeatable trigger (stays high as long as motion continues), while 'L' is single trigger (times out even during continuous movement)."
      }
    ],
    quiz: [
      {
        question: "What type of radiation does a PIR sensor detect?",
        options: ["Ultraviolet radiation", "Passive infrared thermal emissions (8-14 µm)", "Radio microwaves", "Gamma rays"],
        correct_answer: 1,
        explanation: "PIR sensors detect black-body thermal radiation emitted by warm objects in the infrared spectrum."
      },
      {
        question: "What is the purpose of the faceted white dome covering the PIR sensor?",
        options: ["Decorative cover", "Fresnel lens that divides the detection area into optical zones", "Waterproof membrane", "Magnifying glass for visible light"],
        correct_answer: 1,
        explanation: "The Fresnel lens focuses infrared energy from different angles onto the pyroelectric detector elements."
      },
      {
        question: "Why is a warm-up delay necessary upon powering on a PIR module?",
        options: ["To warm the heating coil", "To allow internal amplifiers to baseline ambient thermal radiation", "To charge the battery", "To load firmware"],
        correct_answer: 1,
        explanation: "The pyroelectric crystals need 30 to 60 seconds to reach thermal equilibrium with their ambient surroundings."
      },
      {
        question: "What output voltage does the HC-SR501 OUT pin provide when motion is detected?",
        options: ["3.3V (Logic HIGH)", "12V", "0V", "Alternating current 110V"],
        correct_answer: 0,
        explanation: "The onboard regulator provides 3.3V logic HIGH output, which is fully compatible with 5V Arduino inputs."
      },
      {
        question: "Can a PIR sensor detect someone standing completely motionless?",
        options: ["Yes, always", "No, it only detects changes in thermal differential between adjacent zones", "Only in the dark", "Only if wearing metal"],
        correct_answer: 1,
        explanation: "PIR sensors are differential sensors; they only generate output when a heat signature crosses between its dual sensor slots."
      }
    ],
    views_count: 2310,
    completions_count: 1610,
    is_published: true,
    created_at: "2024-01-22T16:00:00Z",
    updated_at: "2024-01-22T16:00:00Z"
  },
  {
    id: "tut-8",
    title: "IR Remote Control: Decoding 38kHz NEC Infrared Signals",
    slug: "ir-remote-control",
    description: "Harness standard television remote controls to command Arduino microcontroller actions wirelessly! Consumer remote controls communicate using invisible infrared light pulsed at a 38kHz carrier frequency to reject ambient illumination and fluorescent light noise. By using an integrated TSOP1838 or VS1838B IR receiver and the IRremote library, you will decode the popular NEC transmission protocol, capture unique 32-bit hex command codes for each button, and switch multi-channel appliances remotely.",
    category_id: "cat-2",
    difficulty: "intermediate",
    time_estimate: 40,
    cost_estimate: 14.0,
    hero_image: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand 38kHz carrier modulation and optical bandpass filtering",
      "Decode NEC, Sony, and RC5 infrared protocol packets",
      "Map hex keypad codes to switch-case command handlers",
      "Control appliances and LED brightness with remote button inputs"
    ],
    prerequisites: ["Library installation and switch-case control structures"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "VS1838B / TSOP4838 IR Receiver", quantity: 1, price: 1.5, buy_url: "https://adafruit.com" },
      { name: "Mini IR Remote Controller (NEC)", quantity: 1, price: 2.5, buy_url: "https://sparkfun.com" },
      { name: "LEDs & 220Ω Resistors", quantity: 3, price: 0.6, buy_url: "https://digikey.com" },
      { name: "Breadboard & Jumpers", quantity: 1, price: 1.5, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: IR Remote Control Decoder
 * Author: Circuitly Academy
 * Library: "IRremote" by Armin Joachimsmeyer (v4+)
 */

#include <IRremote.hpp>

const int IR_RECEIVE_PIN = 7;
const int LED_PIN = 10;
bool ledState = false;

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);

  // Initialize the IR receiver
  IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);
  Serial.println("IR Remote Receiver Ready. Press buttons on remote!");
}

void loop() {
  if (IrReceiver.decode()) {
    // Print command details to Serial
    Serial.print("Protocol: ");
    Serial.print(getProtocolString(IrReceiver.decodedIRData.protocol));
    Serial.print(" | Command Hex: 0x");
    Serial.println(IrReceiver.decodedIRData.command, HEX);

    // Check specific remote command
    switch (IrReceiver.decodedIRData.command) {
      case 0x45: // Power button on mini remote
        ledState = !ledState;
        digitalWrite(LED_PIN, ledState ? HIGH : LOW);
        Serial.println("Action: Toggled Appliance Power!");
        break;

      case 0x46: // Mode button
        Serial.println("Action: Mode selected");
        break;

      default:
        // Other buttons
        break;
    }

    // Prepare to receive the next IR pulse packet
    IrReceiver.resume();
  }
}
`,
    steps: [
      {
        order: 1,
        title: "Install IRremote Library",
        description: "Open Arduino Library Manager and install 'IRremote' by Armin Joachimsmeyer.",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Identify IR Receiver Pinout",
        description: "Looking at the bulbous front face of the VS1838B: Pin 1 (left) = OUT, Pin 2 (center) = GND, Pin 3 (right) = VCC (+5V).",
        image_url: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Connect to Arduino",
        description: "Wire OUT to Pin 7, GND to GND, and VCC to 5V. Wire an indicator LED to Pin 10.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Read Hex Codes & Map Commands",
        description: "Upload code, open Serial Monitor, aim the remote at the receiver and press each button to map its hex code.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why does the remote not register any codes?",
        answer: "Check the plastic battery insulating pull-tab inside the remote battery compartment; remove it to power the CR2025 coin cell."
      },
      {
        question: "Why does pressing and holding a button output code 0x0?",
        answer: "The NEC protocol transmits a special short repeat code when a key is continuously held down. You can check if IrReceiver.decodedIRData.flags & IRDATA_FLAGS_IS_REPEAT is true."
      },
      {
        question: "Why does IRremote clash with tone() in my code?",
        answer: "Both libraries default to using hardware Timer 2 on the ATmega328P. You can configure IRremote to use Timer 1 in its configuration header."
      }
    ],
    quiz: [
      {
        question: "What standard carrier frequency is used by consumer IR remotes to modulate signals?",
        options: ["50 Hz", "38 kHz", "2.4 GHz", "433 MHz"],
        correct_answer: 1,
        explanation: "38 kHz is the global consumer electronics carrier frequency for infrared pulse modulation."
      },
      {
        question: "What is the function of the internal bandpass filter in the VS1838B receiver?",
        options: ["Rejects ambient sunlight and 50/60Hz indoor lighting noise", "Amplifies FM radio", "Converts sound to light", "Dims the LED"],
        correct_answer: 0,
        explanation: "The integrated receiver optical filter only passes optical signals pulsing at approximately 38 kHz."
      },
      {
        question: "Which transmission protocol is most prevalent among Arduino hobby remotes?",
        options: ["Bluetooth", "NEC protocol", "Ethernet", "CAN bus"],
        correct_answer: 1,
        explanation: "The NEC protocol (32-bit address and command with inverted check bytes) is the standard for maker IR controllers."
      },
      {
        question: "Why must IrReceiver.resume() be invoked at the end of the decode block?",
        options: ["To reboot the Arduino", "To re-enable interrupts and prime the buffer for the next incoming IR burst", "To turn off the receiver", "To save to EEPROM"],
        correct_answer: 1,
        explanation: "IrReceiver.resume() resets the decoder state machine to capture subsequent signals."
      },
      {
        question: "What type of battery commonly powers slim infrared remote controls?",
        options: ["9V rectangular battery", "CR2025 or CR2032 lithium coin cell", "Car battery", "AA alkaline only"],
        correct_answer: 1,
        explanation: "Standard mini remotes use 3V CR2025 or CR2032 lithium button coin cells."
      }
    ],
    views_count: 1890,
    completions_count: 1320,
    is_published: true,
    created_at: "2024-01-25T11:20:00Z",
    updated_at: "2024-01-25T11:20:00Z"
  },
  {
    id: "tut-9",
    title: "LCD 16x2 Display: I2C Character Display Interface",
    slug: "lcd-16x2-hello-world",
    description: "Add a crisp alphanumeric visual interface to your projects without squandering digital I/O pins! Standard 16x2 character displays normally demand 16 connections and 6 dedicated Arduino GPIO pins. By utilizing a PCF8574 I2C backpack expander, you compress all control lines down to just 2 wires: SDA (Serial Data) and SCL (Serial Clock). In this comprehensive tutorial, you will discover the I2C protocol address scanning procedure, initialize the LiquidCrystal_I2C library, print dynamic variables, control backlights, and design custom 5x8 pixel custom glyphs.",
    category_id: "cat-3",
    difficulty: "intermediate",
    time_estimate: 30,
    cost_estimate: 12.0,
    hero_image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand the I2C synchronous bus protocol (SDA / SCL lines)",
      "Run an I2C bus scanner sketch to determine hex device addresses (0x27 or 0x3F)",
      "Position the cursor and format multi-row text on 16-column displays",
      "Design and render custom 5x8 bitmapped graphic characters in CGRAM"
    ],
    prerequisites: ["Basic Arduino IDE and I2C awareness"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "16x2 LCD with I2C Backpack", quantity: 1, price: 4.5, buy_url: "https://adafruit.com" },
      { name: "Female-to-Male Jumper Wires", quantity: 4, price: 0.8, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: 16x2 LCD I2C Character Display
 * Author: Circuitly Academy
 * Library: "LiquidCrystal_I2C" by Frank de Brabander
 * Pins: SDA -> A4, SCL -> A5 on Arduino Uno
 */

#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Set the LCD address to 0x27 for a 16 chars and 2 line display
// (If 0x27 shows blank, try 0x3F)
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Custom Heart Character (5x8 pixel bitmap)
byte heartChar[8] = {
  B00000,
  B01010,
  B11111,
  B11111,
  B01110,
  B00100,
  B00000,
  B00000
};

void setup() {
  lcd.init();          // Initialize the LCD
  lcd.backlight();     // Turn on backlight
  
  // Register custom character 0 in CGRAM
  lcd.createChar(0, heartChar);

  // Print welcome message
  lcd.setCursor(0, 0); // Column 0, Row 0
  lcd.print("Circuitly Labs");

  lcd.setCursor(0, 1); // Column 0, Row 1
  lcd.print("Arduino ");
  lcd.write(0); // Display custom heart
  lcd.print(" Maker");
}

void loop() {
  // Flash cursor or update run time counter
  lcd.setCursor(12, 0);
  lcd.print(millis() / 1000);
  delay(500);
}
`,
    steps: [
      {
        order: 1,
        title: "Install LiquidCrystal_I2C Library",
        description: "In the Library Manager, install 'LiquidCrystal I2C' by Frank de Brabander.",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Connect I2C Pins to Arduino Uno",
        description: "Connect GND to GND, VCC to 5V, SDA to Arduino Analog Pin A4, and SCL to Analog Pin A5.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Adjust Blue Contrast Trimpot",
        description: "On the back of the I2C module, use a small screwdriver to turn the blue potentiometer until clear white letter blocks become visible against the blue backlight.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Upload & Verify Text Display",
        description: "Upload code and see 'Circuitly Labs' appear on row 1 with your custom heart icon on row 2!",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "The backlight turns on, but only solid white rectangles appear on the first row.",
        answer: "The blue contrast trimmer is set either too dark or the I2C address is mismatched. Run an I2C scanner sketch to verify if your display is 0x27 or 0x3F."
      },
      {
        question: "Where are SDA and SCL pins on Arduino Mega or Leonardo?",
        answer: "On Arduino Mega, SDA is Pin 20 and SCL is Pin 21. On Arduino Leonardo, SDA is Pin 2 and SCL is Pin 3."
      },
      {
        question: "Can I connect multiple I2C devices to the same SDA/SCL lines simultaneously?",
        answer: "Yes, I2C is a bus protocol! As long as each connected device has a unique address (e.g. LCD at 0x27, sensor at 0x68), they can share the exact same two wires."
      }
    ],
    quiz: [
      {
        question: "Which dedicated pins carry I2C SDA and SCL on the Arduino Uno?",
        options: ["Pins 0 and 1", "Pins 9 and 10", "Analog pins A4 and A5", "Pins 12 and 13"],
        correct_answer: 2,
        explanation: "On the ATmega328P Arduino Uno, A4 is the I2C SDA data line and A5 is the SCL clock line."
      },
      {
        question: "What are the two most common hex default addresses for PCF8574 I2C backpacks?",
        options: ["0x00 and 0xFF", "0x27 and 0x3F", "0x12 and 0x34", "0x80 and 0x90"],
        correct_answer: 1,
        explanation: "Depending on whether the PCF8574 or PCF8574A chip is populated, the default factory address is either 0x27 or 0x3F."
      },
      {
        question: "What does lcd.setCursor(5, 1) do?",
        options: ["Moves cursor to column 5 of the second row (index 1)", "Moves cursor to column 1 of row 5", "Deletes 5 characters", "Sets font size to 5"],
        correct_answer: 0,
        explanation: "Coordinates are zero-indexed (column, row), so row 1 specifies the bottom second line."
      },
      {
        question: "How many custom 5x8 pixel characters can be stored in the HD44780 CGRAM memory at once?",
        options: ["2", "8", "64", "256"],
        correct_answer: 1,
        explanation: "The standard HD44780 LCD controller provides 8 slots (indices 0 through 7) for custom user-generated character bitmaps."
      },
      {
        question: "What electrical pull-up resistors are required for reliable I2C bus communication?",
        options: ["100kΩ", "Typically 4.7kΩ on both SDA and SCL", "None, resistors are forbidden", "1 Ohm"],
        correct_answer: 1,
        explanation: "4.7kΩ pullup resistors are standard to pull the open-drain SDA and SCL lines up to +5V."
      }
    ],
    views_count: 3100,
    completions_count: 2280,
    is_published: true,
    created_at: "2024-01-28T09:00:00Z",
    updated_at: "2024-01-28T09:00:00Z"
  },
  {
    id: "tut-10",
    title: "RGB LED Color Mixer: Analog PWM Synthesis",
    slug: "rgb-led-color-mixer",
    description: "Generate millions of brilliant color shades using additive optical color mixing! An RGB LED encapsulates three independent micro-LED dies (Red, Green, and Blue) inside a single 4-lead diffuser lens. By modulating the duty cycle on each channel using 8-bit Pulse Width Modulation via analogWrite() (0 to 255), you will construct custom hues including cyan, magenta, orange, and smooth rainbow crossfades. This project covers both Common Cathode and Common Anode topologies and mathematically calculates smooth HSV to RGB color transitions.",
    category_id: "cat-3",
    difficulty: "intermediate",
    time_estimate: 25,
    cost_estimate: 8.0,
    hero_image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Distinguish between Common Cathode and Common Anode RGB architectures",
      "Master 8-bit Pulse Width Modulation (PWM) on pins 9, 10, and 11",
      "Calculate series resistors tailored to individual diode forward voltages",
      "Write smooth mathematical color interpolation algorithms"
    ],
    prerequisites: ["Blink LED and PWM basic concepts"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "Common Cathode 5mm RGB LED", quantity: 1, price: 0.8, buy_url: "https://adafruit.com" },
      { name: "220Ω Resistors (Red & Green)", quantity: 2, price: 0.2, buy_url: "https://digikey.com" },
      { name: "150Ω Resistor (Blue)", quantity: 1, price: 0.1, buy_url: "https://digikey.com" },
      { name: "Breadboard & Jumpers", quantity: 1, price: 1.5, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: RGB LED Color Mixer & Rainbow Fade
 * Author: Circuitly Academy
 * Hardware: Common Cathode RGB LED on PWM pins 9 (Red), 10 (Green), 11 (Blue)
 */

const int PIN_RED = 9;
const int PIN_GREEN = 10;
const int PIN_BLUE = 11;

void setColor(int red, int green, int blue) {
  // For Common Cathode: 255 is full brightness, 0 is OFF
  analogWrite(PIN_RED, red);
  analogWrite(PIN_GREEN, green);
  analogWrite(PIN_BLUE, blue);
}

void setup() {
  pinMode(PIN_RED, OUTPUT);
  pinMode(PIN_GREEN, OUTPUT);
  pinMode(PIN_BLUE, OUTPUT);
}

void loop() {
  // Test primary colors
  setColor(255, 0, 0); // Red
  delay(1000);
  setColor(0, 255, 0); // Green
  delay(1000);
  setColor(0, 0, 255); // Blue
  delay(1000);

  // Mixed colors
  setColor(255, 255, 0); // Yellow
  delay(1000);
  setColor(160, 32, 240); // Purple
  delay(1000);
  setColor(0, 229, 160); // Circuitly Mint Green
  delay(1000);

  // Continuous rainbow crossfade
  for (int i = 0; i < 256; i++) {
    setColor(255 - i, i, 0); // Red to Green
    delay(5);
  }
  for (int i = 0; i < 256; i++) {
    setColor(0, 255 - i, i); // Green to Blue
    delay(5);
  }
  for (int i = 0; i < 256; i++) {
    setColor(i, 0, 255 - i); // Blue to Red
    delay(5);
  }
}
`,
    steps: [
      {
        order: 1,
        title: "Identify 4 RGB LED Leads",
        description: "Hold the LED up. The longest lead is the Common pin (Cathode in this project). The lead alone to the left is Red, and the two leads to the right are Green and Blue.",
        image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Connect Current Limiting Resistors",
        description: "Insert the LED into the breadboard. Place a 220Ω resistor on the Red pin row, 220Ω on the Green pin row, and 150Ω on the Blue pin row.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Wire to Arduino PWM Pins",
        description: "Connect Red to Pin 9, Green to Pin 10, Blue to Pin 11, and the longest common pin to Arduino GND.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Upload & Watch Colors Morph",
        description: "Upload code and enjoy a fluid spectrum of glowing color blends illuminating your breadboard!",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Colors appear inverted (e.g. 255 is off, 0 is bright).",
        answer: "You have a Common Anode LED instead of Common Cathode. Connect the long lead to 5V instead of GND, and invert your values: analogWrite(pin, 255 - val)."
      },
      {
        question: "Red appears much brighter than Blue and Green.",
        answer: "Red has a lower forward voltage (~1.8V vs ~3.2V for Blue). Increase the Red series resistor to 330Ω to balance color intensity."
      },
      {
        question: "Can I connect RGB pins to any digital pin?",
        answer: "No. Only PWM-enabled pins (marked with a tilde ~ like 3, 5, 6, 9, 10, 11 on Arduino Uno) support analogWrite() brightness levels."
      }
    ],
    quiz: [
      {
        question: "What does the longest leg on an RGB LED indicate?",
        options: ["The Red channel", "The Common pin (either Anode or Cathode)", "The Blue channel", "A mounting bracket"],
        correct_answer: 1,
        explanation: "The longest lead is always the common pin shared by all three internal diode junctions."
      },
      {
        question: "What resolution does the default Arduino analogWrite() function provide?",
        options: ["2-bit (0-3)", "8-bit (0-255 levels)", "16-bit (0-65535)", "Analog voltage 0 to 100V"],
        correct_answer: 1,
        explanation: "Standard Arduino Uno analogWrite() provides 8-bit resolution, dividing the duty cycle into 256 discrete steps."
      },
      {
        question: "How do you generate Yellow light using an RGB LED?",
        options: ["Full Red + Full Blue", "Full Red + Full Green", "Full Green + Full Blue", "Blue only"],
        correct_answer: 1,
        explanation: "In additive color theory, mixing Red and Green wavelengths produces Yellow."
      },
      {
        question: "How do Common Anode LEDs differ from Common Cathode LEDs in software control?",
        options: ["Common Anode requires logic inversion: 0 is full brightness, 255 is completely off", "They require AC power", "They cannot fade", "They only produce white"],
        correct_answer: 0,
        explanation: "In Common Anode, the common pin is tied to +5V; grounding the cathode pin (0V) completes the circuit."
      },
      {
        question: "Which Arduino Uno digital pins support hardware PWM for analogWrite()?",
        options: ["Pins 0, 1, 2, 4", "Pins 3, 5, 6, 9, 10, 11 (marked with ~)", "Only Pin 13", "All pins from 0 to 13"],
        correct_answer: 1,
        explanation: "Only the pins with hardware timer outputs (3, 5, 6, 9, 10, 11 on the ATmega328P) support PWM."
      }
    ],
    views_count: 2650,
    completions_count: 1890,
    is_published: true,
    created_at: "2024-01-30T15:00:00Z",
    updated_at: "2024-01-30T15:00:00Z"
  },
  {
    id: "tut-11",
    title: "Joystick Controlled Pan-Tilt Servo Gimbal",
    slug: "joystick-controlled-servo",
    description: "Map analog human inputs directly to electromechanical movement! Dual-axis analog thumb joysticks contain two perpendicular 10kΩ potentiometers and a momentary tactile push switch. As the joystick tilts along the X and Y axes, moving wiper arms output varying voltages between 0V and 5V. In this project, you will read these analog values with the 10-bit Analog-to-Digital Converter (ADC via analogRead()), implement deadband filtering to eliminate resting thumb drift, map raw 0-1023 integer ranges to 0-180 degree servo limits using map(), and steer dual-axis gimbals smoothly.",
    category_id: "cat-4",
    difficulty: "intermediate",
    time_estimate: 35,
    cost_estimate: 16.0,
    hero_image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand dual-axis potentiometer voltage divider mechanics",
      "Read 10-bit analog signals (0 to 1023) using the ATmega328P ADC",
      "Implement deadzone filtering to avoid servo jitter around the resting center",
      "Use map() and constrain() functions to coordinate multi-axis servo motion"
    ],
    prerequisites: ["Servo control and analogRead concepts"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "Dual-Axis Analog Joystick Module", quantity: 1, price: 2.0, buy_url: "https://adafruit.com" },
      { name: "SG90 Micro Servos", quantity: 2, price: 7.0, buy_url: "https://sparkfun.com" },
      { name: "Pan-Tilt Camera Bracket", quantity: 1, price: 2.5, buy_url: "https://amazon.com" },
      { name: "Jumpers & Breadboard", quantity: 1, price: 1.5, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: Dual-Axis Joystick Pan/Tilt Servo Gimbal
 * Author: Circuitly Academy
 * Pins: VRx -> A0, VRy -> A1, Pan Servo -> Pin 9, Tilt Servo -> Pin 10
 */

#include <Servo.h>

Servo panServo;
Servo tiltServo;

const int JOY_X_PIN = A0;
const int JOY_Y_PIN = A1;
const int PAN_PIN = 9;
const int TILT_PIN = 10;

int panAngle = 90;
int tiltAngle = 90;

void setup() {
  panServo.attach(PAN_PIN);
  tiltServo.attach(TILT_PIN);

  panServo.write(panAngle);
  tiltServo.write(tiltAngle);
}

void loop() {
  // Read analog joystick values (0 to 1023, center ~512)
  int xVal = analogRead(JOY_X_PIN);
  int yVal = analogRead(JOY_Y_PIN);

  // Implement deadzone thresholding (center 480 to 540)
  if (xVal > 540) {
    panAngle = panAngle + map(xVal, 540, 1023, 1, 4);
  } else if (xVal < 480) {
    panAngle = panAngle - map(xVal, 480, 0, 1, 4);
  }

  if (yVal > 540) {
    tiltAngle = tiltAngle + map(yVal, 540, 1023, 1, 4);
  } else if (yVal < 480) {
    tiltAngle = tiltAngle - map(yVal, 480, 0, 1, 4);
  }

  // Constrain angles within physical servo bounds
  panAngle = constrain(panAngle, 10, 170);
  tiltAngle = constrain(tiltAngle, 10, 170);

  // Dispatch servo angles
  panServo.write(panAngle);
  tiltServo.write(tiltAngle);

  delay(20); // 50Hz update cycle
}
`,
    steps: [
      {
        order: 1,
        title: "Assemble Pan-Tilt Servo Gimbal",
        description: "Mount the pan servo horizontally to the base and the tilt servo vertically to the upper bracket using the included screws.",
        image_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Wire Joystick Module",
        description: "Connect joystick VCC to 5V, GND to GND, VRx to Analog Pin A0, and VRy to Analog Pin A1.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Wire Servos to PWM Pins",
        description: "Connect Pan servo signal to Pin 9 and Tilt servo signal to Pin 10 with power tied to the 5V and GND rails.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Test Smooth Gimbal Tracking",
        description: "Upload sketch. Push the joystick in any direction to smoothly pilot the robotic turret!",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why do the servos drift continuously even when I am not touching the joystick?",
        answer: "Mechanical spring centering in cheap joysticks sits around ~505 to ~520 rather than precisely 512. Increase the deadband margin in code (e.g. between 460 and 560)."
      },
      {
        question: "Why does the servo move in the opposite direction of my thumb?",
        answer: "Invert the mapping formula: swap the addition/subtraction signs or replace map(val, 0, 1023, 0, 180) with map(val, 0, 1023, 180, 0)."
      },
      {
        question: "Can the Arduino power both servos directly from its 5V regulator?",
        answer: "Moving both servos rapidly draws peak current spikes exceeding 1 Amp, which may reset your Arduino. Use an external 5V 2A power bank with common ground."
      }
    ],
    quiz: [
      {
        question: "What numerical range does Arduino analogRead() return for 0V to 5V inputs?",
        options: ["0 to 100", "0 to 255", "0 to 1023 (10-bit ADC)", "0 to 65535"],
        correct_answer: 2,
        explanation: "The ATmega328P incorporates a 10-bit ADC (2^10 = 1024 distinct integer steps from 0 to 1023)."
      },
      {
        question: "What is a 'deadzone' or 'deadband' in joystick programming?",
        options: ["A dead battery", "A range around center rest position where input is ignored to prevent twitching", "An unusable pin", "A screen border"],
        correct_answer: 1,
        explanation: "Deadbands ignore tiny mechanical fluctuations around center rest position to maintain steady output."
      },
      {
        question: "What function prevents a variable from exceeding min/max thresholds in Arduino C++?",
        options: ["limit()", "constrain(x, a, b)", "clamp()", "ceiling()"],
        correct_answer: 1,
        explanation: "constrain(x, a, b) ensures x stays within the boundaries between a and b."
      },
      {
        question: "What electronic component is located inside each joystick axis?",
        options: ["Optical encoder", "Rotary potentiometer", "Piezo crystal", "Hall effect sensor"],
        correct_answer: 1,
        explanation: "Standard analog thumbsticks contain two perpendicular rotary potentiometers."
      },
      {
        question: "What does the map(x, 0, 1023, 0, 180) function do mathematically?",
        options: ["Converts integer x linearly from the range [0, 1023] to [0, 180]", "Finds GPS coordinates", "Scales logarithmically", "Rounds to nearest whole number"],
        correct_answer: 0,
        explanation: "map() performs linear integer interpolation between an incoming range and a target range."
      }
    ],
    views_count: 2410,
    completions_count: 1680,
    is_published: true,
    created_at: "2024-02-02T10:00:00Z",
    updated_at: "2024-02-02T10:00:00Z"
  },
  {
    id: "tut-12",
    title: "Ultrasonic Parking Sensor: Dynamic Audio-Visual Distance Warning",
    slug: "ultrasonic-parking-sensor",
    description: "Recreate automotive reverse parking assistant systems! In modern vehicles, rear ultrasonic sensors emit acoustic waves to measure bumper distance from obstacles and warn drivers through progressive acoustic beeps and multi-stage LED bar graphs. In this project, you will combine an HC-SR04 sonar module, 3 colored warning LEDs (Green for safe, Yellow for caution, Red for danger), and a piezo buzzer. As an approaching object draws nearer, your Arduino dynamically calculates distance, elevates the beeping frequency, and activates warning alarms below critical thresholds.",
    category_id: "cat-2",
    difficulty: "intermediate",
    time_estimate: 40,
    cost_estimate: 20.0,
    hero_image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Fuse sonar distance measurements with proportional acoustic feedback",
      "Structure multi-tier warning thresholds (Zone A: Safe, Zone B: Caution, Zone C: Danger)",
      "Program variable frequency buzzer beeps without blocking delays",
      "Build realistic automotive telemetry warning systems"
    ],
    prerequisites: ["HC-SR04 distance calculation and buzzer tones"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "HC-SR04 Ultrasonic Sensor", quantity: 1, price: 2.5, buy_url: "https://adafruit.com" },
      { name: "Piezo Buzzer", quantity: 1, price: 1.0, buy_url: "https://sparkfun.com" },
      { name: "Green, Yellow, Red LEDs", quantity: 3, price: 0.6, buy_url: "https://digikey.com" },
      { name: "220Ω Resistors", quantity: 3, price: 0.3, buy_url: "https://digikey.com" },
      { name: "Breadboard & Jumpers", quantity: 1, price: 1.5, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: Automotive Ultrasonic Parking Sensor
 * Author: Circuitly Academy
 * Pinout: Trig -> 9, Echo -> 10, Buzzer -> 8, Green -> 5, Yellow -> 6, Red -> 7
 */

const int PIN_TRIG = 9;
const int PIN_ECHO = 10;
const int PIN_BUZZER = 8;
const int PIN_GREEN = 5;
const int PIN_YELLOW = 6;
const int PIN_RED = 7;

long measureDistance() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);

  long duration = pulseIn(PIN_ECHO, HIGH, 30000);
  if (duration == 0) return 999; // Out of range
  return (duration * 0.0343) / 2;
}

void setup() {
  Serial.begin(9600);
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(PIN_GREEN, OUTPUT);
  pinMode(PIN_YELLOW, OUTPUT);
  pinMode(PIN_RED, OUTPUT);
}

void loop() {
  long distance_cm = measureDistance();

  // Reset LEDs
  digitalWrite(PIN_GREEN, LOW);
  digitalWrite(PIN_YELLOW, LOW);
  digitalWrite(PIN_RED, LOW);

  if (distance_cm > 50) {
    // Safe Zone: Green on, no beeping
    digitalWrite(PIN_GREEN, HIGH);
    noTone(PIN_BUZZER);
    delay(200);
  } else if (distance_cm > 20 && distance_cm <= 50) {
    // Caution Zone: Yellow on, slow beeps
    digitalWrite(PIN_YELLOW, HIGH);
    tone(PIN_BUZZER, 1000, 50);
    delay(map(distance_cm, 20, 50, 80, 350));
  } else if (distance_cm <= 20) {
    // Danger Zone: Red on, continuous / rapid alarm
    digitalWrite(PIN_RED, HIGH);
    tone(PIN_BUZZER, 2000, 40);
    delay(map(distance_cm, 5, 20, 40, 100));
  }
}
`,
    steps: [
      {
        order: 1,
        title: "Place Traffic-Style Indicator LEDs",
        description: "Arrange Green (Safe), Yellow (Caution), and Red (Hazard) LEDs in a clean row on your breadboard with 220Ω series resistors to ground.",
        image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Wire Ultrasonic Sensor & Buzzer",
        description: "Mount HC-SR04 sonar facing forward on the breadboard. Wire TRIG to Pin 9, ECHO to Pin 10, and buzzer to Pin 8.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Connect LED Signal Lines",
        description: "Connect Green to Pin 5, Yellow to Pin 6, and Red to Pin 7.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Calibrate Obstacle Approach",
        description: "Move your hand toward the sensor. As distance shrinks, the beeping accelerates and LEDs advance from Green to Yellow to rapid Red!",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why does the buzzer emit a continuous high-pitched whine with no pulsing?",
        answer: "Ensure tone(PIN, freq, duration) specifies a duration in milliseconds, or verify delay timing in the caution/danger branches."
      },
      {
        question: "Readings glitch to 999 cm periodically.",
        answer: "Echo acoustic reflection was lost due to sensor angle or reflection dispersion. Add a simple 3-sample median filter in software to smooth transients."
      },
      {
        question: "Can I mount this on an actual vehicle bumper?",
        answer: "Automotive automotive systems use weather-sealed, waterproof transducers (such as JSN-SR04T) because moisture destroys bare HC-SR04 elements."
      }
    ],
    quiz: [
      {
        question: "What happens to the beeping cadence as the vehicle gets closer to an obstacle?",
        options: ["The beeping slows down", "The beeping accelerates until becoming a solid continuous tone", "It changes to FM radio", "Nothing"],
        correct_answer: 1,
        explanation: "Proportional acoustic feedback increases pulse repetition rates as distance narrows."
      },
      {
        question: "What is the typical minimum blind spot distance for an HC-SR04 ultrasonic sensor?",
        options: ["Zero mm", "Approximately 2 centimeters", "1 meter", "50 centimeters"],
        correct_answer: 1,
        explanation: "Because transducers need time to stop ringing after transmitting, targets closer than ~2cm cannot be measured accurately."
      },
      {
        question: "What function maps distance (20 to 50 cm) to beep delay interval (80 to 350 ms)?",
        options: ["map(distance, 20, 50, 80, 350)", "scale()", "analogWrite()", "normalize()"],
        correct_answer: 0,
        explanation: "The map() utility scales the input distance dynamically to dictate pause duration."
      },
      {
        question: "Why should pulseIn() incorporate a timeout parameter?",
        options: ["To save electricity", "To prevent blocking the loop for up to 1 full second if no echo returns", "To make it louder", "It is mandatory by law"],
        correct_answer: 1,
        explanation: "Without a timeout, pulseIn defaults to waiting up to 1,000,000 microseconds if no echo bounces back."
      },
      {
        question: "What waterproof ultrasonic module is recommended for outdoor automotive installations?",
        options: ["JSN-SR04T", "DHT11", "SG90", "LM35"],
        correct_answer: 0,
        explanation: "The JSN-SR04T features a sealed waterproof transducer suitable for automobile bumpers."
      }
    ],
    views_count: 2750,
    completions_count: 1910,
    is_published: true,
    created_at: "2024-02-05T13:40:00Z",
    updated_at: "2024-02-05T13:40:00Z"
  },
  {
    id: "tut-13",
    title: "Soil Moisture Monitor: Automated Plant Irrigation Alert",
    slug: "soil-moisture-monitor",
    description: "Save your houseplants with automated electronic soil hydration telemetry! Resistive and capacitive soil moisture probes measure the dielectric permittivity and electrical resistance of plant potting soil. Wet soil enriched with dissolved mineral ions conducts electricity easily (low resistance), while arid soil acts as an insulator. In this smart agriculture tutorial, you will read analog soil probe data, calibrate dry vs submerged thresholds, activate visual OLED or LED hydration status indicators, and trigger a 5V relay to drive a miniature submersible water pump.",
    category_id: "cat-7",
    difficulty: "intermediate",
    time_estimate: 35,
    cost_estimate: 15.0,
    hero_image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Compare resistive vs corrosion-resistant capacitive soil probes",
      "Calibrate dry air reference vs soaked soil analog endpoints",
      "Control inductive loads like miniature DC water pumps via 5V relays",
      "Prevent galvanic probe electrolysis through switched sensor power gating"
    ],
    prerequisites: ["Analog inputs and basic transistor or relay switching"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "Capacitive Soil Moisture Sensor v1.2", quantity: 1, price: 3.0, buy_url: "https://adafruit.com" },
      { name: "5V Single Channel Relay Module", quantity: 1, price: 2.5, buy_url: "https://sparkfun.com" },
      { name: "Mini 5V Submersible Water Pump + Tubing", quantity: 1, price: 4.5, buy_url: "https://amazon.com" },
      { name: "Jumpers & Breadboard", quantity: 1, price: 1.5, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: Automated Plant Irrigation System
 * Author: Circuitly Academy
 * Hardware: Capacitive Soil Sensor on A0, Relay on Pin 7, Status LED on Pin 13
 */

const int SOIL_PIN = A0;
const int RELAY_PIN = 7;
const int LED_PIN = 13;

// Calibration values (Adjust according to your soil tests!)
const int AIR_VALUE = 620;   // Sensor in dry air (0% moisture)
const int WATER_VALUE = 310; // Sensor submerged in water (100% moisture)
const int DRY_THRESHOLD_PERCENT = 30; // Water when moisture falls below 30%

void setup() {
  Serial.begin(9600);
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);

  // Most relay modules are Active LOW (HIGH = OFF, LOW = ON)
  digitalWrite(RELAY_PIN, HIGH);
  digitalWrite(LED_PIN, LOW);
  Serial.println("Soil Moisture Irrigation Controller Online.");
}

void loop() {
  int rawValue = analogRead(SOIL_PIN);

  // Map analog raw values to 0 - 100% moisture percentage
  int moisturePercent = map(rawValue, AIR_VALUE, WATER_VALUE, 0, 100);
  moisturePercent = constrain(moisturePercent, 0, 100);

  Serial.print("Raw: ");
  Serial.print(rawValue);
  Serial.print(" | Soil Moisture: ");
  Serial.print(moisturePercent);
  Serial.println("%");

  if (moisturePercent < DRY_THRESHOLD_PERCENT) {
    Serial.println("STATUS: Soil is parched! Activating water pump...");
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(RELAY_PIN, LOW); // Turn pump ON
    delay(2500);                  // Dispense water for 2.5 seconds
    digitalWrite(RELAY_PIN, HIGH); // Turn pump OFF
    digitalWrite(LED_PIN, LOW);
    
    Serial.println("Pumping complete. Resting 10s for water percolation...");
    delay(10000); // Allow water to absorb into soil
  } else {
    delay(3000); // Check moisture every 3 seconds
  }
}
`,
    steps: [
      {
        order: 1,
        title: "Calibrate Soil Sensor In Air and Water",
        description: "Read raw analog numbers with the sensor dry in air (e.g. ~620) and dipped into a cup of water up to the marked white line (e.g. ~310). Note these two values.",
        image_url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Connect Capacitive Sensor to A0",
        description: "Wire VCC to 3.3V or 5V, GND to GND, and AOUT to Arduino Pin A0.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Wire 5V Relay Module",
        description: "Connect Relay IN to Digital Pin 7, VCC to 5V, and GND to GND. Wire pump motor in series with Relay Common (COM) and Normally Open (NO) terminals.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Insert into Plant Pot & Test",
        description: "Insert sensor into potting soil. When soil dries, the relay clicks and pump delivers water until desired moisture is restored!",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why did cheap resistive fork-style sensors corrode and dissolve within two weeks?",
        answer: "Continuous DC current through wet soil triggers electrochemical galvanic corrosion, stripping the copper plating. Use capacitive sensors or power the sensor only for 10ms during sampling."
      },
      {
        question: "Why does the relay turn on when I set the pin to HIGH instead of LOW?",
        answer: "Optocoupler relay modules are typically Active LOW (LOW energizes the coil). Invert your digitalWrite commands if needed."
      },
      {
        question: "Can I power the DC pump motor directly from the Arduino 5V pin?",
        answer: "Never! DC pumps draw heavy inductive motor currents (up to 800mA) and generate back-EMF spikes that will permanently destroy your microcontroller. Power the motor through an external supply."
      }
    ],
    quiz: [
      {
        question: "Why are capacitive soil moisture probes superior to resistive fork probes?",
        options: ["They do not have exposed copper tracks in contact with soil, preventing galvanic corrosion", "They are made of gold", "They operate without batteries", "They measure temperature only"],
        correct_answer: 0,
        explanation: "Capacitive sensors measure soil dielectric permittivity through solder mask insulation without direct metal contact, preventing electrolysis."
      },
      {
        question: "What does the COM and NO labeling on a relay stand for?",
        options: ["Communication and Number", "Common and Normally Open", "Computer and Network Operator", "Current and Output"],
        correct_answer: 1,
        explanation: "COM is the central Common pole; NO (Normally Open) stays disconnected until the relay coil is energized."
      },
      {
        question: "What protective component absorbs inductive reverse flyback voltage spikes from motors and relay coils?",
        options: ["Flyback diode", "Capacitive sensor", "Pull-up resistor", "Zener fuse"],
        correct_answer: 0,
        explanation: "A reverse-biased flyback diode across inductive coils dissipates collapsing magnetic field energy safely."
      },
      {
        question: "Why should you allow a waiting pause after dispensing water before re-reading soil moisture?",
        options: ["To let the motor cool", "To give water time to percolate through potting soil to reach the probe", "Because Arduino timers slow down", "To reset the ADC"],
        correct_answer: 1,
        explanation: "Water takes seconds to minutes to saturate dry soil; immediate re-reading causes excessive over-watering."
      },
      {
        question: "What happens to the electrical capacitance of soil as water content increases?",
        options: ["It drops to zero", "It increases significantly because water has a high dielectric constant (~80 vs ~3 for dry soil)", "It stays identical", "It turns negative"],
        correct_answer: 1,
        explanation: "Water has a very high dielectric constant (approx 80), dramatically elevating sensor capacitance."
      }
    ],
    views_count: 2980,
    completions_count: 2040,
    is_published: true,
    created_at: "2024-02-08T11:10:00Z",
    updated_at: "2024-02-08T11:10:00Z"
  },
  {
    id: "tut-14",
    title: "OLED Display Graphics: 0.96-inch SSD1306 Vector UI",
    slug: "oled-display-graphics",
    description: "Upgrade from rudimentary character LCDs to high-contrast graphical OLED displays! The 0.96-inch 128x64 SSD1306 monochrome OLED display features individually addressable organic LEDs with true deep blacks and wide viewing angles. Communicating across the high-speed I2C bus using the Adafruit SSD1306 and GFX libraries, you will render vector lines, geometric rectangles, circles, animated battery meters, real-time telemetry graphs, and custom 1-bit monochrome bitmap sprites.",
    category_id: "cat-3",
    difficulty: "intermediate",
    time_estimate: 45,
    cost_estimate: 22.0,
    hero_image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand 128x64 bitmapped frame buffers and RAM allocation",
      "Draw 2D primitives: lines, rectangles, rounded boxes, circles, and filled triangles",
      "Construct dynamic animated battery gauges and moving oscilloscopes",
      "Render custom monochrome bitmap graphics and custom typography"
    ],
    prerequisites: ["I2C protocol and Adafruit GFX library basics"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "0.96 inch I2C OLED (SSD1306 128x64)", quantity: 1, price: 4.5, buy_url: "https://adafruit.com" },
      { name: "Female-to-Male Jumper Wires", quantity: 4, price: 0.8, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: SSD1306 0.96" I2C OLED Graphics & Telemetry UI
 * Author: Circuitly Academy
 * Libraries: "Adafruit_SSD1306" and "Adafruit_GFX"
 * Address: Usually 0x3C
 */

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3C

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void setup() {
  Serial.begin(9600);

  // Initialize display with 3.3V internal charge pump
  if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println("SSD1306 allocation failed. Check wiring!");
    for (;;); // Don't proceed, loop forever
  }

  display.clearDisplay();

  // Draw Header Bar
  display.fillRect(0, 0, 128, 14, SSD1306_WHITE);
  display.setTextColor(SSD1306_BLACK);
  display.setTextSize(1);
  display.setCursor(18, 3);
  display.println("CIRCUITLY LABS");

  // Draw Animated Battery Icon in header
  display.drawRect(108, 3, 16, 8, SSD1306_BLACK);
  display.fillRect(124, 5, 2, 4, SSD1306_BLACK);
  display.fillRect(110, 5, 10, 4, SSD1306_BLACK);

  // Draw Circular Dial Graphic
  display.drawCircle(32, 40, 18, SSD1306_WHITE);
  display.fillCircle(32, 40, 4, SSD1306_WHITE);
  display.drawLine(32, 40, 42, 30, SSD1306_WHITE);

  // Text Data on Right Side
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(64, 24);
  display.print("SPD: ");
  display.print("48");
  display.print(" km/h");

  display.setCursor(64, 40);
  display.print("VOLT: ");
  display.print("12.4");
  display.print(" V");

  // Draw Bottom Progress Line
  display.drawLine(0, 63, 127, 63, SSD1306_WHITE);

  // Push frame buffer to physical display
  display.display();
}

void loop() {
  // Static dashboard view rendered in setup
}
`,
    steps: [
      {
        order: 1,
        title: "Install Adafruit GFX & SSD1306 Libraries",
        description: "Open Library Manager in Arduino IDE and install 'Adafruit SSD1306' and agree to install 'Adafruit GFX Library' dependencies.",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Wire I2C OLED to Arduino Uno",
        description: "Connect GND to GND, VDD/VCC to 5V (or 3.3V), SCK/SCL to Analog Pin A5, and SDA to Analog Pin A4.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Confirm I2C Address",
        description: "Most 0.96 inch displays use address 0x3C (some use 0x3D). If your screen does not light up, run an I2C scanner.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Upload & View Modern Telemetry UI",
        description: "Upload sketch. Enjoy high-contrast vector curves, graphics gauges, and custom fonts appearing crisp and clear!",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why did my Arduino IDE show 'Low memory available, stability problems may occur'?",
        answer: "A 128x64 1-bit screen buffer consumes 1024 bytes (1 KB) of RAM—half the 2KB total RAM of the ATmega328P. Keep global variables lightweight, or upgrade to an ESP32 for complex projects."
      },
      {
        question: "I called display.drawCircle() but the screen remains completely black.",
        answer: "You must always call display.display() at the end to flush the RAM frame buffer onto the physical screen."
      },
      {
        question: "Why is the top two rows of pixels yellow and the bottom blue?",
        answer: "Many budget 0.96-inch OLED displays are dual-color hardware (the top 16 rows are physically yellow and bottom 48 rows are blue)."
      }
    ],
    quiz: [
      {
        question: "How many bytes of RAM are needed to buffer a 128x64 monochrome frame (1 bit per pixel)?",
        options: ["128 bytes", "1024 bytes (1 KB)", "64 KB", "8 MB"],
        correct_answer: 1,
        explanation: "(128 pixels * 64 pixels) = 8,192 bits. Divided by 8 bits/byte = exactly 1,024 bytes."
      },
      {
        question: "What function actually transmits the in-memory drawing canvas to the physical OLED controller?",
        options: ["display.show()", "display.display()", "display.flush()", "display.update()"],
        correct_answer: 1,
        explanation: "Adafruit_SSD1306 requires display.display() to push the local buffer over I2C to the screen controller."
      },
      {
        question: "What is the common I2C bus address for SSD1306 0.96-inch OLED modules?",
        options: ["0x3C", "0x00", "0xFF", "0x55"],
        correct_answer: 0,
        explanation: "0x3C is standard (with 0x3D selectable by moving a resistor on the back of the PCB)."
      },
      {
        question: "Why do OLEDs consume significantly less power when displaying mostly black screens compared to LCDs?",
        options: ["Black pixels in OLEDs are completely powered off (emitting no light)", "OLEDs do not use power", "They absorb sunlight", "They have a cooling fan"],
        correct_answer: 0,
        explanation: "Unlike LCDs with continuous power-hungry backlights, each individual OLED diode emits its own light and turns completely dark for black pixels."
      },
      {
        question: "What coordinate represents the top-left corner of the SSD1306 screen?",
        options: ["(0, 0)", "(1, 1)", "(128, 64)", "(-1, -1)"],
        correct_answer: 0,
        explanation: "Screen coordinate systems are zero-indexed with origin (0, 0) situated at the upper-left corner."
      }
    ],
    views_count: 3410,
    completions_count: 2450,
    is_published: true,
    created_at: "2024-02-10T16:20:00Z",
    updated_at: "2024-02-10T16:20:00Z"
  },
  {
    id: "tut-15",
    title: "Bluetooth RC Car: Smartphone Controlled Robotics with L298N",
    slug: "bluetooth-rc-car",
    description: "Construct an autonomous smartphone-controlled 2-wheel-drive robotic rover! This flagship robotics project unites wireless Bluetooth serial communication, H-bridge DC motor drive electronics, differential steering kinematics, and mobile application telemetry. Using the classic HC-05 Bluetooth transceiver and an L298N Dual H-Bridge motor driver module, your Arduino parses directional serial commands ('F' for Forward, 'B' for Backward, 'L' for Left, 'R' for Right, 'S' for Stop) sent from an Android or iOS gamepad application.",
    category_id: "cat-6",
    difficulty: "advanced",
    time_estimate: 90,
    cost_estimate: 45.0,
    hero_image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand H-Bridge polarity switching and back-EMF suppression",
      "Control DC motor speed and direction using PWM and Enable jumpers",
      "Configure HC-05 Bluetooth module with SoftwareSerial AT commands",
      "Implement differential tank-steering algorithms for robot navigation"
    ],
    prerequisites: ["DC motor basics, PWM, and Serial communication"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "L298N Dual H-Bridge Motor Driver Module", quantity: 1, price: 4.5, buy_url: "https://adafruit.com" },
      { name: "HC-05 or HC-06 Bluetooth Module", quantity: 1, price: 5.0, buy_url: "https://sparkfun.com" },
      { name: "2WD Robot Chassis Kit (2 DC Motors + Wheels + Caster)", quantity: 1, price: 14.0, buy_url: "https://amazon.com" },
      { name: "2x 18650 Li-ion Battery Holder (7.4V)", quantity: 1, price: 4.0, buy_url: "https://amazon.com" },
      { name: "Jumper Wires & Screws", quantity: 1, price: 2.0, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: Bluetooth RC Smartphone Controlled Robot
 * Author: Circuitly Academy
 * Hardware: HC-05 Bluetooth on Pins 2 (RX), 3 (TX)
 * Motor Driver L298N: ENA(5), IN1(6), IN2(7), IN3(8), IN4(9), ENB(10)
 */

#include <SoftwareSerial.h>

SoftwareSerial BTSerial(2, 3); // Arduino RX, TX

// Left Motor Pins
const int PIN_ENA = 5;
const int PIN_IN1 = 6;
const int PIN_IN2 = 7;

// Right Motor Pins
const int PIN_IN3 = 8;
const int PIN_IN4 = 9;
const int PIN_ENB = 10;

int motorSpeed = 200; // PWM speed (0 to 255)

void stopMotors() {
  digitalWrite(PIN_IN1, LOW);
  digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, LOW);
  digitalWrite(PIN_IN4, LOW);
}

void moveForward() {
  analogWrite(PIN_ENA, motorSpeed);
  analogWrite(PIN_ENB, motorSpeed);
  digitalWrite(PIN_IN1, HIGH);
  digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, HIGH);
  digitalWrite(PIN_IN4, LOW);
}

void moveBackward() {
  analogWrite(PIN_ENA, motorSpeed);
  analogWrite(PIN_ENB, motorSpeed);
  digitalWrite(PIN_IN1, LOW);
  digitalWrite(PIN_IN2, HIGH);
  digitalWrite(PIN_IN3, LOW);
  digitalWrite(PIN_IN4, HIGH);
}

void turnLeft() {
  analogWrite(PIN_ENA, motorSpeed);
  analogWrite(PIN_ENB, motorSpeed);
  digitalWrite(PIN_IN1, LOW);
  digitalWrite(PIN_IN2, HIGH); // Left spins backward
  digitalWrite(PIN_IN3, HIGH); // Right spins forward
  digitalWrite(PIN_IN4, LOW);
}

void turnRight() {
  analogWrite(PIN_ENA, motorSpeed);
  analogWrite(PIN_ENB, motorSpeed);
  digitalWrite(PIN_IN1, HIGH);
  digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, LOW);
  digitalWrite(PIN_IN4, HIGH);
}

void setup() {
  Serial.begin(9600);
  BTSerial.begin(9600); // Standard HC-05 default baud rate

  pinMode(PIN_ENA, OUTPUT);
  pinMode(PIN_IN1, OUTPUT);
  pinMode(PIN_IN2, OUTPUT);
  pinMode(PIN_IN3, OUTPUT);
  pinMode(PIN_IN4, OUTPUT);
  pinMode(PIN_ENB, OUTPUT);

  stopMotors();
  Serial.println("Bluetooth Robot Car Online! Waiting for app pairing...");
}

void loop() {
  if (BTSerial.available()) {
    char cmd = BTSerial.read();
    Serial.print("Received Command: ");
    Serial.println(cmd);

    switch (cmd) {
      case 'F': moveForward(); break;
      case 'B': moveBackward(); break;
      case 'L': turnLeft(); break;
      case 'R': turnRight(); break;
      case 'S': stopMotors(); break;
      default: break;
    }
  }
}
`,
    steps: [
      {
        order: 1,
        title: "Assemble 2WD Mechanical Chassis",
        description: "Mount the two DC gearmotors to the acrylic chassis plate using mounting brackets. Press-fit rubber wheels and affix the front ball caster.",
        image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Wire L298N Motor Driver",
        description: "Connect Left motor leads to OUT1 & OUT2, Right motor leads to OUT3 & OUT4. Connect battery 7.4V/12V into L298N VMS block, and share GND with Arduino GND.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Connect HC-05 Bluetooth Transceiver",
        description: "Wire HC-05 VCC to 5V, GND to GND, TXD to Arduino Pin 2, and RXD to Arduino Pin 3 (preferably through a 1k/2k voltage divider because HC-05 RX is 3.3V).",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Pair Phone and Drive",
        description: "Install 'Arduino Bluetooth Controller' on smartphone. Pair with HC-05 (passcode 1234), select Gamepad mode, and steer your robot across the floor!",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "When I command Forward, one wheel spins forward but the other spins backward.",
        answer: "DC motor polarity is reversed on that side. Simply swap the two wires connected to OUT1/OUT2 or OUT3/OUT4 terminals."
      },
      {
        question: "The robot immediately disconnects Bluetooth whenever the motors engage.",
        answer: "Motor stall current is causing battery voltage to sag, causing the Arduino and HC-05 to reset. Ensure your 18650 Li-ion cells are fully charged and add a 470uF capacitor across the 5V logic line."
      },
      {
        question: "Why does the HC-05 RX pin need a voltage divider?",
        answer: "While the HC-05 board takes 5V VCC, its serial RX data pin is rated for 3.3V logic. Connecting a 5V Arduino TX directly can degrade the transceiver over time."
      }
    ],
    quiz: [
      {
        question: "What circuit allows an electric DC motor to spin in both clockwise and counter-clockwise directions?",
        options: ["H-Bridge", "Voltage divider", "Wheatstone bridge", "Schmitt trigger"],
        correct_answer: 0,
        explanation: "An H-bridge employs four switching transistors to reverse current polarity across the motor terminals."
      },
      {
        question: "What is the standard factory pairing PIN code for most HC-05 Bluetooth modules?",
        options: ["0000 or 1234", "9999", "No password", "8888"],
        correct_answer: 0,
        explanation: "1234 (or 0000) is the default Bluetooth pairing passcode programmed into HC-05 firmware."
      },
      {
        question: "How does differential steering achieve a sharp pivot turn in place?",
        options: ["Both wheels turn in the same direction at equal speeds", "One wheel spins forward while the opposite wheel spins backward", "By pivoting front steering knuckles like a car", "By cutting power completely"],
        correct_answer: 1,
        explanation: "Counter-rotating the left and right wheels creates a zero-radius spin around the robot's center axis."
      },
      {
        question: "Why can't DC motors be powered directly from Arduino digital output pins?",
        options: ["Pins provide only up to 40mA, whereas DC motors require 500mA to 2000mA", "Arduino code forbids it", "Pins are AC current only", "Motors spin too fast"],
        correct_answer: 0,
        explanation: "Microcontroller pins cannot supply the hundreds of milliamps required to overcome motor inductive stall loads."
      },
      {
        question: "What function modulates the speed of motors connected to an L298N driver?",
        options: ["analogWrite() on the ENA and ENB enable pins", "digitalRead()", "pulseIn()", "tone()"],
        correct_answer: 0,
        explanation: "PWM duty cycles applied to the Enable pins (ENA/ENB) modulate average current, adjusting wheel RPM."
      }
    ],
    views_count: 4120,
    completions_count: 2780,
    is_published: true,
    created_at: "2024-02-14T10:00:00Z",
    updated_at: "2024-02-14T10:00:00Z"
  },
  {
    id: "tut-16",
    title: "IoT Weather Station: ESP8266 Cloud Telemetry Dashboard",
    slug: "iot-weather-station-esp8266",
    description: "Connect physical microcontrollers directly to the Internet of Things! The ESP8266 Wi-Fi SoC features an integrated TCP/IP stack that enables microcontrollers to transmit telemetry packets over local 802.11b/g/n wireless networks to modern cloud servers. In this connected IoT workshop, you will gather temperature, atmospheric pressure, and humidity data from a precision BME280 sensor, package measurements into structured JSON payloads, and post sensor telemetry across HTTPS REST APIs and MQTT brokers to a live cloud dashboard.",
    category_id: "cat-5",
    difficulty: "advanced",
    time_estimate: 120,
    cost_estimate: 55.0,
    hero_image: "https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Configure ESP8266 / NodeMCU Wi-Fi in Station Mode (STA)",
      "Read calibrated Barometric Pressure and Altitude via I2C BME280",
      "Format telemetry packets into JSON using ArduinoJson",
      "Dispatch HTTP POST requests to cloud databases and live dashboards"
    ],
    prerequisites: ["Wi-Fi router credentials and basic HTTP API concepts"],
    components: [
      { name: "NodeMCU ESP8266 or ESP32 Board", quantity: 1, price: 6.0, buy_url: "https://store.arduino.cc" },
      { name: "BME280 Barometric Pressure & Temp Sensor", quantity: 1, price: 8.5, buy_url: "https://adafruit.com" },
      { name: "Breadboard & Jumpers", quantity: 1, price: 2.0, buy_url: "https://sparkfun.com" }
    ],
    code: `/*
 * Project: ESP8266 IoT Cloud Weather Station
 * Author: Circuitly Academy
 * Libraries: "ESP8266WiFi", "Adafruit_BME280", "ArduinoJson"
 */

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* apiEndpoint = "http://api.circuitly.io/v1/telemetry";

Adafruit_BME280 bme; // I2C address typically 0x76

void setup() {
  Serial.begin(115200);
  delay(100);

  Serial.println("\\nConnecting to Wi-Fi...");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\\nWiFi Connected! IP Address: ");
  Serial.println(WiFi.localIP());

  // Initialize BME280 sensor
  if (!bme.begin(0x76)) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1);
  }
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    float tempC = bme.readTemperature();
    float humidity = bme.readHumidity();
    float pressureHpa = bme.readPressure() / 100.0F;

    Serial.printf("Temp: %.1f C | Hum: %.1f %% | Pres: %.1f hPa\\n", tempC, humidity, pressureHpa);

    // Prepare JSON payload string
    String jsonPayload = "{\\"temperature\\":" + String(tempC) +
                         ",\\"humidity\\":" + String(humidity) +
                         ",\\"pressure\\":" + String(pressureHpa) + "}";

    http.begin(client, apiEndpoint);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0) {
      Serial.printf("Cloud telemetry HTTP Response: %d\\n", httpResponseCode);
    } else {
      Serial.printf("HTTP Error: %s\\n", http.errorToString(httpResponseCode).c_str());
    }

    http.end();
  }

  delay(30000); // Transmit sample every 30 seconds
}
`,
    steps: [
      {
        order: 1,
        title: "Install ESP8266 Board Package",
        description: "In Arduino IDE Settings, add ESP8266 board manager URL: http://arduino.esp8266.com/stable/package_esp8266com_index.json, then install 'esp8266 by ESP8266 Community'.",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Wire BME280 to NodeMCU I2C Pins",
        description: "Connect BME280 VCC to 3.3V, GND to GND, SCL to NodeMCU Pin D1 (GPIO 5), and SDA to NodeMCU Pin D2 (GPIO 4).",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Set Network Credentials & Upload",
        description: "Enter your home Wi-Fi SSID and password in the sketch. Select 'NodeMCU 1.0 (ESP-12E Module)' board and upload at 115200 baud.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Monitor Live Cloud Dashboard",
        description: "Open Serial Monitor. Watch your device obtain a DHCP IP address and start streaming temperature, humidity, and barometric pressure data to the cloud!",
        image_url: "https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why does the ESP8266 fail to connect to my 5GHz Wi-Fi network?",
        answer: "The ESP8266 only supports 2.4GHz Wi-Fi (802.11 b/g/n). Ensure your wireless router has a dedicated 2.4GHz band enabled."
      },
      {
        question: "Why does the BME280 fail initialization?",
        answer: "Some Chinese BME280 break-out boards are hardwired to I2C address 0x76 instead of Adafruit's default 0x77. Pass 0x76 to bme.begin(0x76)."
      },
      {
        question: "What does the 'wdt reset' error mean in the serial console?",
        answer: "The Watchdog Timer reset because user code blocked background Wi-Fi tasks for too long. Avoid lengthy blocking delay() calls; use non-blocking millis() or call yield()."
      }
    ],
    quiz: [
      {
        question: "What Wi-Fi frequency band does the ESP8266 hardware support?",
        options: ["2.4 GHz only", "5.0 GHz only", "Both 2.4 GHz and 5 GHz", "60 GHz millimeter wave"],
        correct_answer: 0,
        explanation: "The ESP8266 hardware RF front-end is strictly limited to 2.4 GHz 802.11b/g/n networks."
      },
      {
        question: "What physical weather parameter does the BME280 sensor measure that the DHT11 cannot?",
        options: ["Barometric Atmospheric Pressure", "Wind direction", "Rainfall volume", "Solar radiation"],
        correct_answer: 0,
        explanation: "The Bosch BME280 measures barometric pressure with high precision (hPa), enabling elevation and weather forecasting."
      },
      {
        question: "What data format is standard for transmitting structured IoT REST payloads across web services?",
        options: ["JSON", "Assembly", "Raw Hex bytecode", "CSV only"],
        correct_answer: 0,
        explanation: "JavaScript Object Notation (JSON) is the universal format for web API telemetry."
      },
      {
        question: "What operating voltage does the ESP8266 microcontroller natively run on?",
        options: ["3.3 Volts", "5.0 Volts", "12.0 Volts", "1.2 Volts"],
        correct_answer: 0,
        explanation: "The ESP8266 core operates on 3.3V logic (applying 5V directly to its GPIO pins will destroy the silicon)."
      },
      {
        question: "What function prevents the ESP8266 Software Watchdog Timer (WDT) from resetting during lengthy loops?",
        options: ["yield() or delay()", "stop()", "reset()", "cli()"],
        correct_answer: 0,
        explanation: "yield() allows the background ESP8266 Wi-Fi and TCP stack to service networking interrupts."
      }
    ],
    views_count: 4890,
    completions_count: 3120,
    is_published: true,
    created_at: "2024-02-18T14:30:00Z",
    updated_at: "2024-02-18T14:30:00Z"
  },
  {
    id: "tut-17",
    title: "Line Following Autonomous Robot: PID Tracking with IR Arrays",
    slug: "line-following-robot",
    description: "Build an autonomous industrial AGV (Automated Guided Vehicle) that navigates along track lines with millimeter precision! Line-following robots rely on optical reflectance sensors that compare light absorption between high-contrast surfaces (black electrical tape absorbing infrared vs white flooring reflecting infrared). Using an array of TCRT5000 infrared reflective optical sensors and a Proportional-Integral-Derivative (PID) closed-loop steering controller, your robot will traverse high-speed curves and sharp intersections without losing its path.",
    category_id: "cat-6",
    difficulty: "advanced",
    time_estimate: 100,
    cost_estimate: 50.0,
    hero_image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand TCRT5000 phototransistor optical reflectance physics",
      "Calculate normalized track trajectory position error (-100 to +100)",
      "Tune Proportional and Derivative (PD) control gains to suppress steering wobble",
      "Design differential speed biasing on dual DC gearmotors"
    ],
    prerequisites: ["Motor driver control and analog reading"],
    components: [
      { name: "Arduino Uno or Nano", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "5-Channel IR Tracker Sensor Bar (TCRT5000)", quantity: 1, price: 6.5, buy_url: "https://adafruit.com" },
      { name: "L298N or TB6612FNG Motor Driver", quantity: 1, price: 4.5, buy_url: "https://sparkfun.com" },
      { name: "2WD Robot Chassis with Metal Gearmotors", quantity: 1, price: 16.0, buy_url: "https://amazon.com" },
      { name: "7.4V LiPo Battery Pack", quantity: 1, price: 12.0, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: PID Line Following Autonomous Robot
 * Author: Circuitly Academy
 * Hardware: 5x TCRT5000 Line Sensors (Pins A0-A4), L298N Motor Driver
 */

const int SENSOR_PINS[5] = {A0, A1, A2, A3, A4};
const int PIN_ENA = 5;
const int PIN_IN1 = 6;
const int PIN_IN2 = 7;
const int PIN_IN3 = 8;
const int PIN_IN4 = 9;
const int PIN_ENB = 10;

const int BASE_SPEED = 180;
const float Kp = 25.0; // Proportional Gain
const float Kd = 15.0; // Derivative Gain

int lastError = 0;

void setMotors(int leftSpeed, int rightSpeed) {
  leftSpeed = constrain(leftSpeed, 0, 255);
  rightSpeed = constrain(rightSpeed, 0, 255);

  analogWrite(PIN_ENA, leftSpeed);
  analogWrite(PIN_ENB, rightSpeed);
  digitalWrite(PIN_IN1, HIGH);
  digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, HIGH);
  digitalWrite(PIN_IN4, LOW);
}

void setup() {
  for (int i = 0; i < 5; i++) {
    pinMode(SENSOR_PINS[i], INPUT);
  }
  pinMode(PIN_ENA, OUTPUT);
  pinMode(PIN_IN1, OUTPUT);
  pinMode(PIN_IN2, OUTPUT);
  pinMode(PIN_IN3, OUTPUT);
  pinMode(PIN_IN4, OUTPUT);
  pinMode(PIN_ENB, OUTPUT);
}

void loop() {
  // Read sensor states (1 = black line, 0 = white floor)
  int s[5];
  for (int i = 0; i < 5; i++) {
    s[i] = digitalRead(SENSOR_PINS[i]);
  }

  // Calculate weighted tracking error: center is 0
  int error = 0;
  if (s[0] == 1) error = -4;
  else if (s[1] == 1) error = -2;
  else if (s[2] == 1) error = 0;
  else if (s[3] == 1) error = 2;
  else if (s[4] == 1) error = 4;

  // Calculate PD correction
  int correction = (Kp * error) + (Kd * (error - lastError));
  lastError = error;

  int leftMotorSpeed = BASE_SPEED + correction;
  int rightMotorSpeed = BASE_SPEED - correction;

  setMotors(leftMotorSpeed, rightMotorSpeed);
  delay(10); // 100Hz control loop
}
`,
    steps: [
      {
        order: 1,
        title: "Mount Optical Sensor Bar Low to Ground",
        description: "Fasten the 5-channel TCRT5000 sensor bar at the front underside of the chassis, keeping it between 5mm to 10mm from the floor.",
        image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Calibrate Threshold Trimpots",
        description: "Place the sensors over black electrical tape, then white paper. Turn the sensitivity trimmers until each sensor's LED switches cleanly between surfaces.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Wire Sensors & Driver to Arduino",
        description: "Connect sensor outputs 1-5 to Analog Pins A0 through A4, and connect motor control lines to Pins 5 through 10.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Tune PID Gains on Track",
        description: "Create an oval track with 3/4-inch black electrical tape. Upload code and watch the robot track the line smoothly through sharp bends!",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "The robot oscillates violently from side to side like a fish tail.",
        answer: "Your proportional gain Kp is too high relative to your loop rate. Lower Kp and increase the derivative gain Kd to damp oscillations."
      },
      {
        question: "The robot shoots off the line on tight 90-degree turns.",
        answer: "Lower BASE_SPEED from 180 to 140, or add logic to check if all sensors read 0, commanding a spin in the last known direction."
      },
      {
        question: "The sensors do not detect the black line on shiny floors.",
        answer: "Glossy tiles reflect infrared light even when black. Use matte surfaces or calibrate the sensor bar closer to the ground (~5mm)."
      }
    ],
    quiz: [
      {
        question: "How does a TCRT5000 optical sensor distinguish between black and white surfaces?",
        options: ["White surfaces reflect emitted IR light into the phototransistor; black absorbs it", "It detects magnetic fields", "It measures floor temperature", "It reads radio waves"],
        correct_answer: 0,
        explanation: "Black surfaces absorb infrared wavelengths while white surfaces reflect energy back into the receiver."
      },
      {
        question: "What does the Derivative (D) term in a PD/PID controller do?",
        options: ["Damps rapid rate of change to prevent overshoot and wobble", "Increases maximum speed", "Turns off motors", "Inverts steering"],
        correct_answer: 0,
        explanation: "Derivative error dampens sudden changes, preventing erratic overshooting across track transitions."
      },
      {
        question: "What is an AGV in modern automated industrial warehousing?",
        options: ["Automated Guided Vehicle", "Analog Ground Vector", "Alternative Gear Valve", "Automatic Gas Valve"],
        correct_answer: 0,
        explanation: "Automated Guided Vehicles transport materials in factories following floor magnetic or optical lines."
      },
      {
        question: "Why is a weighted sensor position error calculation useful?",
        options: ["It gives outer sensors stronger corrective influence when the robot drifts far from center", "It saves battery", "It doubles motor voltage", "It is required by C++"],
        correct_answer: 0,
        explanation: "Weighting outer sensors gives stronger steering feedback when the robot is further off track."
      },
      {
        question: "What is the recommended clearance distance between TCRT5000 sensors and the floor?",
        options: ["5 to 10 millimeters", "1 meter", "50 centimeters", "Zero (must drag on the floor)"],
        correct_answer: 0,
        explanation: "TCRT5000 infrared phototransistors have an optimal optical focal distance of 5mm to 10mm."
      }
    ],
    views_count: 3670,
    completions_count: 2410,
    is_published: true,
    created_at: "2024-02-22T09:00:00Z",
    updated_at: "2024-02-22T09:00:00Z"
  },
  {
    id: "tut-18",
    title: "Smart Home Light: AC Appliance Relay Switching with Capacitive Touch",
    slug: "smart-home-light",
    description: "Bring high-voltage domestic appliances into the smart automation era safely! In this electrical engineering tutorial, you will discover how galvanic isolation works using optocouplers and electromechanical relays to switch mains AC voltages (110V/220V) or safe 12V LED light fixtures. You will wire a TTP223 capacitive touch sensor to act as an invisible touch switch through glass or wood, implement software switch debouncing, and program timer routines for automated lighting shutoff.",
    category_id: "cat-7",
    difficulty: "advanced",
    time_estimate: 90,
    cost_estimate: 40.0,
    hero_image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand optoisolator galvanic barrier safety mechanics",
      "Interface TTP223 capacitive touch switches with toggle latching",
      "Safely wire COM, NO, and NC relay terminal blocks",
      "Implement automatic timer shutdown logic to save home energy"
    ],
    prerequisites: ["Electrical safety awareness and digital I/O proficiency"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "Optocoupled 5V Relay Module (10A 250VAC)", quantity: 1, price: 3.0, buy_url: "https://adafruit.com" },
      { name: "TTP223 Capacitive Touch Sensor", quantity: 1, price: 1.5, buy_url: "https://sparkfun.com" },
      { name: "12V 1A Power Adapter & DC Barrel Jack", quantity: 1, price: 6.0, buy_url: "https://amazon.com" },
      { name: "12V LED Lamp or Strip", quantity: 1, price: 8.0, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: Smart Home Touch Activated Relay Lighting
 * Author: Circuitly Academy
 * Hardware: TTP223 Touch on Pin 2, Relay Module on Pin 7, Indicator LED on Pin 13
 */

const int PIN_TOUCH = 2;
const int PIN_RELAY = 7;
const int PIN_LED = 13;

bool lightState = false;
int lastTouchState = LOW;
unsigned long lastDebounceTime = 0;
const unsigned long DEBOUNCE_DELAY_MS = 50;

// Auto-off timer: 15 minutes of inactivity
const unsigned long AUTO_OFF_TIMEOUT_MS = 15UL * 60UL * 1000UL;
unsigned long lightTurnedOnTime = 0;

void setRelay(bool on) {
  lightState = on;
  // Active LOW Relay: LOW = Energized (light ON), HIGH = De-energized (light OFF)
  digitalWrite(PIN_RELAY, on ? LOW : HIGH);
  digitalWrite(PIN_LED, on ? HIGH : LOW);
  
  if (on) {
    lightTurnedOnTime = millis();
    Serial.println("Action: Smart Light Turned ON");
  } else {
    Serial.println("Action: Smart Light Turned OFF");
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(PIN_TOUCH, INPUT);
  pinMode(PIN_RELAY, OUTPUT);
  pinMode(PIN_LED, OUTPUT);

  setRelay(false); // Default to off
  Serial.println("Smart Home Light Controller Initialized.");
}

void loop() {
  int reading = digitalRead(PIN_TOUCH);

  // Software debounce check
  if (reading != lastTouchState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > DEBOUNCE_DELAY_MS) {
    static int currentTouchState = LOW;
    if (reading != currentTouchState) {
      currentTouchState = reading;

      // Toggle state when finger first touches sensor (rising edge)
      if (currentTouchState == HIGH) {
        setRelay(!lightState);
      }
    }
  }

  lastTouchState = reading;

  // Auto-off energy saver logic
  if (lightState && (millis() - lightTurnedOnTime > AUTO_OFF_TIMEOUT_MS)) {
    Serial.println("Energy Saver: Auto-off timeout reached!");
    setRelay(false);
  }
}
`,
    steps: [
      {
        order: 1,
        title: "Test TTP223 Capacitive Touch Sensor",
        description: "Connect TTP223 VCC to 5V, GND to GND, and OUT to Pin 2. Notice the onboard red LED illuminates when your finger gets close to the pad.",
        image_url: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Wire Relay Module to Arduino",
        description: "Connect Relay VCC to 5V, GND to GND, and IN to Arduino Pin 7.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Wire 12V LED Load Circuit",
        description: "Wire the 12V DC power supply positive lead through the relay's COM and NO terminals to the 12V lamp, with DC negative returning directly to ground.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Mount Concealed Switch in Desk",
        description: "Tape the capacitive sensor underneath a wooden desk or behind an acrylic lamp base. Tapping the surface through the wood turns the light on and off!",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Can capacitive touch sensors work through non-metallic materials like glass and plastic?",
        answer: "Yes! TTP223 sensors detect human body capacitance through up to 5mm of glass, plastic, or dry wood without any physical hole."
      },
      {
        question: "Why does the relay make a rapid clicking noise when touched?",
        answer: "Switch contact bounce is triggering multiple state toggles per second. Ensure the 50ms software debounce timer is properly configured in code."
      },
      {
        question: "Is it safe to switch 220V AC household mains directly on a breadboard?",
        answer: "NEVER wire mains AC onto a breadboard! Breadboard metal tracks are rated for low voltage (<30V). Always use insulated terminal blocks inside an enclosed electrical box for high voltage."
      }
    ],
    quiz: [
      {
        question: "What component inside a quality relay module provides complete electrical isolation between logic and load circuits?",
        options: ["Optocoupler (phototransistor)", "Resistor", "Zener diode", "Ceramic capacitor"],
        correct_answer: 0,
        explanation: "Optocouplers transmit control signals via internal infrared light beams, preventing high voltage from reaching the Arduino."
      },
      {
        question: "What does the TTP223 capacitive sensor detect when a finger approaches?",
        options: ["Change in electrical capacitance caused by the human body", "Sound vibration", "Fingerprint ridges", "Heat changes"],
        correct_answer: 0,
        explanation: "The human body acts as an electrical conductor, altering the dielectric capacitance of the sensor pad."
      },
      {
        question: "What happens if you connect a load to COM and NC (Normally Closed) instead of NO?",
        options: ["The load will stay ON by default and turn OFF only when the relay is energized", "The board explodes", "The code fails to compile", "Nothing changes"],
        correct_answer: 0,
        explanation: "NC contacts maintain an electrical connection until the coil is pulled by an active command."
      },
      {
        question: "Why is switch debouncing essential when processing tactile or touch sensor inputs?",
        options: ["Mechanical and capacitive transitions produce electrical chatter that looks like multiple button presses", "To cool the CPU", "To save memory", "To boost signal voltage"],
        correct_answer: 0,
        explanation: "Debouncing filters out microsecond electrical noise to ensure one clean toggle per physical touch."
      },
      {
        question: "What suffix in C++ guarantees an integer literal is treated as an unsigned 32-bit long?",
        options: ["UL (e.g. 1000UL)", ".0F", "i32", "#long"],
        correct_answer: 0,
        explanation: "In C++, the UL suffix (Unsigned Long) prevents 16-bit integer overflow during arithmetic operations like calculating timeouts."
      }
    ],
    views_count: 3120,
    completions_count: 2210,
    is_published: true,
    created_at: "2024-02-25T11:00:00Z",
    updated_at: "2024-02-25T11:00:00Z"
  },
  {
    id: "tut-19",
    title: "RFID Access Control: Smart Door Latch with RC522 & Solenoid",
    slug: "rfid-door-lock",
    description: "Build an electronic RFID door lock similar to hotel room keycards! The MFRC522 radio frequency module operates at 13.56MHz using the SPI bus to communicate with contactless ISO/IEC 14443A MIFARE cards and key fobs. The card contains an embedded antenna coil and microchip that harvests energy directly from the electromagnetic field of the reader. In this project, you will extract unique 4-byte UIDs (Unique Identifiers), manage an authorized whitelist in EEPROM memory, and drive a 12V solenoid door strike via a power MOSFET.",
    category_id: "cat-7",
    difficulty: "advanced",
    time_estimate: 80,
    cost_estimate: 35.0,
    hero_image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand 13.56MHz Near Field electromagnetic inductive coupling",
      "Interface the MFRC522 module using high-speed SPI (MISO, MOSI, SCK, SS)",
      "Authenticate 4-byte MIFARE Classic card UIDs against a security whitelist",
      "Drive high-current 12V inductive solenoid door latches via N-Channel MOSFETs"
    ],
    prerequisites: ["SPI communications and transistor switching"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "RC522 13.56MHz RFID Reader Kit (with Card & Keyfob)", quantity: 1, price: 4.5, buy_url: "https://adafruit.com" },
      { name: "12V Electronic Solenoid Door Lock Latch", quantity: 1, price: 9.0, buy_url: "https://amazon.com" },
      { name: "IRLZ44N Logic Level N-Channel MOSFET", quantity: 1, price: 1.0, buy_url: "https://digikey.com" },
      { name: "1N4007 Flyback Diode + 10kΩ Resistor", quantity: 1, price: 0.5, buy_url: "https://digikey.com" },
      { name: "12V 2A Power Adapter", quantity: 1, price: 7.0, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: RFID RC522 Electronic Door Access Lock
 * Author: Circuitly Academy
 * Libraries: "MFRC522" by GithubCommunity
 * Hardware: RC522 on SPI pins (SDA=10, SCK=13, MOSI=11, MISO=12, RST=9), Solenoid Gate on Pin 6
 */

#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9
#define SOLENOID_PIN 6
#define BUZZER_PIN 8

MFRC522 rfid(SS_PIN, RST_PIN);

// Authorized Key Fob UID bytes: Replace with YOUR card UID!
byte authorizedUID[4] = {0xDE, 0xAD, 0xBE, 0xEF};

void unlockDoor() {
  Serial.println("ACCESS GRANTED: Unlocking Solenoid...");
  tone(BUZZER_PIN, 1500, 100);
  delay(120);
  tone(BUZZER_PIN, 2000, 150);

  digitalWrite(SOLENOID_PIN, HIGH); // Retract solenoid latch
  delay(4000);                      // Hold door open for 4 seconds
  digitalWrite(SOLENOID_PIN, LOW);  // Lock door again
  Serial.println("Door re-locked.");
}

void rejectCard() {
  Serial.println("ACCESS DENIED: Unauthorized RFID Card!");
  tone(BUZZER_PIN, 400, 300);
  delay(350);
  tone(BUZZER_PIN, 400, 300);
}

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();

  pinMode(SOLENOID_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(SOLENOID_PIN, LOW);

  Serial.println("Circuitly RFID Door Lock Armed. Scan your card...");
}

void loop() {
  // Look for new RFID cards
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
    return;
  }

  Serial.print("Scanned Card UID: ");
  bool accessGranted = true;

  for (byte i = 0; i < rfid.uid.size; i++) {
    Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
    Serial.print(rfid.uid.uidByte[i], HEX);

    // Validate byte by byte against authorized UID
    if (i < 4 && rfid.uid.uidByte[i] != authorizedUID[i]) {
      accessGranted = false;
    }
  }
  Serial.println();

  if (accessGranted) {
    unlockDoor();
  } else {
    rejectCard();
  }

  // Halt PICC and re-arm
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}
`,
    steps: [
      {
        order: 1,
        title: "Install MFRC522 Library",
        description: "In the Library Manager, install 'MFRC522' by GithubCommunity.",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Wire RC522 Reader via SPI",
        description: "Connect 3.3V to 3.3V (NEVER 5V), GND to GND, RST to Pin 9, SDA (SS) to Pin 10, MOSI to Pin 11, MISO to Pin 12, and SCK to Pin 13.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Wire Solenoid Drive Circuit",
        description: "Connect Arduino Pin 6 through a 220Ω resistor to the MOSFET Gate, with a 10kΩ pull-down resistor to GND. Place the 1N4007 flyback diode across the solenoid coil terminals in reverse polarity.",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Scan Card to Extract UID & Update Code",
        description: "Upload code, scan your card, note the 4 hex bytes displayed in the Serial Monitor, update authorizedUID array, and re-upload!",
        image_url: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why did my RC522 reader stop responding after connecting to 5V?",
        answer: "The RC522 chip is strictly rated for 3.3V supply voltage. Connecting 5V destroys the chip's input amplifiers. Always power it from the Arduino 3.3V pin."
      },
      {
        question: "Why does the solenoid fail to pull back even when the MOSFET turns on?",
        answer: "Solenoid coils require substantial current (typically 1A to 2A at 12V). Ensure your 12V power supply has adequate amperage rating and that your MOSFET is logic-level (e.g. IRLZ44N, not IRFZ44N which needs 10V gate voltage)."
      },
      {
        question: "Why does scanning a card cause the Arduino to reset?",
        answer: "The solenoid inductive discharge is creating an electrical brownout or electromagnetic interference. Verify the 1N4007 flyback diode is in place across the solenoid terminals."
      }
    ],
    quiz: [
      {
        question: "At what radio carrier frequency does standard MIFARE RFID operate?",
        options: ["125 kHz", "13.56 MHz (High Frequency)", "2.4 GHz", "433 MHz"],
        correct_answer: 1,
        explanation: "MFRC522 / MIFARE Classic operates at the global 13.56 MHz High Frequency RFID standard."
      },
      {
        question: "How does a passive RFID keyfob power its internal silicon microchip?",
        options: ["It harvests electrical energy from the 13.56MHz electromagnetic field via its internal antenna coil", "It has a tiny lithium battery", "It relies on solar cells", "It must be charged overnight"],
        correct_answer: 0,
        explanation: "Passive tags are battery-free; electromagnetic induction from the reader powers the tag chip."
      },
      {
        question: "What is the maximum safe supply voltage for the MFRC522 RFID board VCC?",
        options: ["3.3 Volts", "5.0 Volts", "12 Volts", "24 Volts"],
        correct_answer: 0,
        explanation: "The RC522 chip operates on 3.3V; connecting 5V can cause permanent damage."
      },
      {
        question: "Why is a flyback diode required across the solenoid lock coil?",
        options: ["To prevent reverse inductive voltage spikes from destroying the switching MOSFET", "To speed up unlocking", "To make the solenoid waterproof", "It is optional"],
        correct_answer: 0,
        explanation: "When a solenoid de-energizes, its collapsing magnetic field generates a massive reverse voltage spike; the diode safely clamps this."
      },
      {
        question: "What hardware communication interface does the RC522 utilize with the Arduino?",
        options: ["SPI (Serial Peripheral Interface)", "I2C only", "Parallel 8-bit bus", "OneWire"],
        correct_answer: 0,
        explanation: "The standard MFRC522 breakout utilizes high-speed 4-wire SPI (MOSI, MISO, SCK, SS)."
      }
    ],
    views_count: 3840,
    completions_count: 2690,
    is_published: true,
    created_at: "2024-02-28T10:15:00Z",
    updated_at: "2024-02-28T10:15:00Z"
  },
  {
    id: "tut-20",
    title: "Stepper Motor Precision Motion: CNC Microstepping with A4988",
    slug: "stepper-motor-control",
    description: "Master sub-millimeter positional motion control used in 3D printers and CNC machines! Unlike continuous DC motors or 180-degree limited servos, bipolar stepper motors contain multi-pole magnetic rotors that advance in discrete angular steps (typically 1.8 degrees per full step = 200 steps per revolution). Using the A4988 microstepping driver module and the AccelStepper library, you will configure microstepping modes (up to 1/16th microsteps = 3200 steps/rev), set motor current limits via onboard Vref potentiometers, and build smooth S-curve acceleration routines.",
    category_id: "cat-4",
    difficulty: "advanced",
    time_estimate: 70,
    cost_estimate: 30.0,
    hero_image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    circuit_diagram: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    learning_outcomes: [
      "Understand bipolar 4-wire stepper motor coil phases (A1, A2, B1, B2)",
      "Calibrate A4988 driver Vref current limit potentiometer safely",
      "Configure microstepping resolution jumpers (Full, 1/2, 1/4, 1/8, 1/16 step)",
      "Program smooth acceleration and deceleration profiles using AccelStepper"
    ],
    prerequisites: ["Motor driver principles and basic trigonometry"],
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "https://store.arduino.cc" },
      { name: "NEMA 17 Bipolar Stepper Motor (1.8 deg/step)", quantity: 1, price: 12.0, buy_url: "https://adafruit.com" },
      { name: "A4988 Stepper Motor Driver with Heatsink", quantity: 1, price: 3.5, buy_url: "https://sparkfun.com" },
      { name: "100uF 35V Electrolytic Capacitor", quantity: 1, price: 0.5, buy_url: "https://digikey.com" },
      { name: "12V 2A DC Power Supply", quantity: 1, price: 7.0, buy_url: "https://amazon.com" },
      { name: "Breadboard & Jumpers", quantity: 1, price: 2.0, buy_url: "https://amazon.com" }
    ],
    code: `/*
 * Project: NEMA 17 Stepper Motor Control with A4988
 * Author: Circuitly Academy
 * Library: "AccelStepper" by Mike McCauley
 * Hardware: STEP on Pin 3, DIR on Pin 2
 */

#include <AccelStepper.h>

const int PIN_STEP = 3;
const int PIN_DIR = 2;

// Interface type: 1 = Driver with STEP and DIR pins
AccelStepper stepper(AccelStepper::DRIVER, PIN_STEP, PIN_DIR);

void setup() {
  Serial.begin(9600);

  // Configure maximum velocity and acceleration rates
  stepper.setMaxSpeed(1000.0);      // Steps per second
  stepper.setAcceleration(500.0);   // Steps per second squared
  
  // Set initial target to 1 full revolution (200 steps in full-step mode)
  stepper.moveTo(800);
  Serial.println("AccelStepper initialized. Moving to position 800...");
}

void loop() {
  // If the motor reaches target position, reverse direction!
  if (stepper.distanceToGo() == 0) {
    delay(500); // Dwell pause at apex
    stepper.moveTo(-stepper.currentPosition());
    Serial.print("Target reached. Reversing to: ");
    Serial.println(-stepper.currentPosition());
  }

  // Must call run() as frequently as possible in loop
  stepper.run();
}
`,
    steps: [
      {
        order: 1,
        title: "Identify Stepper Motor Coil Pairs",
        description: "Use a multimeter in continuity mode to identify paired phase coils (Pair A and Pair B) across the 4 motor leads.",
        image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 2,
        title: "Wire A4988 Decoupling Capacitor",
        description: "Place the 100uF capacitor across VMOT and GND pins on the breadboard right next to the driver to prevent LC voltage spikes from frying the A4988.",
        image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 3,
        title: "Set Vref Current Limit",
        description: "With motor disconnected, power the driver and measure voltage on the tiny metal trimmer screw with your multimeter positive probe. Adjust Vref to ~0.6V (for ~1A motors).",
        image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
      },
      {
        order: 4,
        title: "Connect Logic & Run AccelStepper",
        description: "Connect Arduino Pin 2 to DIR, Pin 3 to STEP, bridge RESET and SLEEP pins together, wire 12V to VMOT, and upload sketch!",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    troubleshooting: [
      {
        question: "Why does the stepper motor vibrate, buzz, and twitch in place without rotating?",
        answer: "The coil wires are crossed. Make sure Coil A connects to 1A/1B and Coil B connects to 2A/2B on the driver board."
      },
      {
        question: "The A4988 driver board gets burning hot and the motor stutters intermittently.",
        answer: "The driver is entering thermal overload shutdown because Vref current is set too high. Affix an aluminum heatsink and adjust Vref lower."
      },
      {
        question: "Why must RESET and SLEEP pins be bridged together on the A4988?",
        answer: "The SLEEP pin defaults to LOW (sleep state); connecting it to RESET holds it HIGH, keeping the driver energized."
      }
    ],
    quiz: [
      {
        question: "How many full steps does a standard 1.8° NEMA 17 stepper motor require for one full 360° revolution?",
        options: ["100 steps", "200 steps (360 / 1.8)", "360 steps", "1000 steps"],
        correct_answer: 1,
        explanation: "360 degrees divided by 1.8 degrees per step equals exactly 200 physical full steps."
      },
      {
        question: "What is the primary benefit of microstepping (e.g. 1/16th step mode)?",
        options: ["Smoother rotation, lower resonance, and higher positioning resolution", "Less power consumption", "Lower motor cost", "Doubles motor top speed"],
        correct_answer: 0,
        explanation: "Microstepping subdivides full steps into sinusoidal current steps, reducing motor vibration and increasing positioning fidelity."
      },
      {
        question: "Why is a large capacitor (100µF) mandatory across the VMOT and GND motor power pins?",
        options: ["To suppress high-voltage inductive LC ringing that would destroy the A4988 chip", "To store code", "To change motor color", "To filter audio"],
        correct_answer: 0,
        explanation: "Inductance in long motor leads produces LC voltage spikes exceeding the 35V rating of the A4988; the capacitor absorbs these transients."
      },
      {
        question: "What happens if you unplug the stepper motor while the A4988 driver is powered on?",
        options: ["Nothing", "The high back-EMF spike will permanently destroy the A4988 driver MOSFET outputs", "The Arduino will format", "The motor spins faster"],
        correct_answer: 1,
        explanation: "Never disconnect stepper motor wires while powered; inductive flyback will blow the driver output stages instantly."
      },
      {
        question: "Why should stepper.run() be called on every loop iteration when using AccelStepper?",
        options: ["It calculates acceleration math and dispatches step pulses precisely on schedule without blocking", "To print debugging info", "To check Wi-Fi", "To reset the timer"],
        correct_answer: 0,
        explanation: "AccelStepper relies on frequent run() calls to calculate step timing intervals dynamically."
      }
    ],
    views_count: 3950,
    completions_count: 2850,
    is_published: true,
    created_at: "2024-03-01T12:00:00Z",
    updated_at: "2024-03-01T12:00:00Z"
  }
];

// 3 LEARNING PATHS
export const INITIAL_PATHS: LearningPath[] = [
  {
    id: "path-1",
    title: "Arduino Starter Path: From First Blink to Autonomous Control",
    slug: "arduino-starter-path",
    description: "The definitive beginner curriculum for physical computing. Master breadboarding, digital and analog I/O, Pulse Width Modulation, and essential sensor protocols across 10 progressive hands-on projects.",
    cover_image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    difficulty: "beginner",
    tutorial_ids: ["tut-1", "tut-2", "tut-3", "tut-4", "tut-5", "tut-6", "tut-7", "tut-8", "tut-9", "tut-10"],
    is_published: true
  },
  {
    id: "path-2",
    title: "Sensor Mastery Path: Telemetry, Optics & Precision Environmental Probing",
    slug: "sensor-mastery-path",
    description: "Deepen your instrumentation expertise! Master capacitive hydration sensing, acoustic sonar timing, pyroelectric thermal sensing, ambient light modulation, and high-contrast graphical telemetry displays.",
    cover_image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    difficulty: "intermediate",
    tutorial_ids: ["tut-3", "tut-4", "tut-7", "tut-8", "tut-11", "tut-12", "tut-13", "tut-14"],
    is_published: true
  },
  {
    id: "path-3",
    title: "Robotics Engineer Path: Wireless Telemetry, Autonomous AGVs & CNC Motion",
    slug: "robotics-engineer-path",
    description: "Construct advanced electromechanical machines! From closed-loop PID line-tracking rovers and smartphone-linked Bluetooth rovers to CNC stepper motor microstepping and IoT cloud telemetry.",
    cover_image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    difficulty: "advanced",
    tutorial_ids: ["tut-6", "tut-11", "tut-15", "tut-16", "tut-17", "tut-18", "tut-19", "tut-20"],
    is_published: true
  }
];

// 10 BADGES
export const INITIAL_BADGES: Badge[] = [
  {
    id: "badge-1",
    name: "First Blink",
    slug: "first-blink",
    description: "Successfully compiled and uploaded your very first LED circuit sketch.",
    icon: "Sparkles",
    color: "#00E5A0",
    requirement_rule: { type: "tutorials_completed", threshold: 1 }
  },
  {
    id: "badge-2",
    name: "Circuit Master",
    slug: "circuit-master",
    description: "Completed 5 hardware tutorials across digital and analog categories.",
    icon: "Cpu",
    color: "#38bdf8",
    requirement_rule: { type: "tutorials_completed", threshold: 5 }
  },
  {
    id: "badge-3",
    name: "Sensor Pro",
    slug: "sensor-pro",
    description: "Successfully wired and calibrated 3 distinct environmental sensors.",
    icon: "Activity",
    color: "#a855f7",
    requirement_rule: { type: "category_completed", threshold: 3, category: "sensors" }
  },
  {
    id: "badge-4",
    name: "IoT Pioneer",
    slug: "iot-pioneer",
    description: "Streamed physical sensor telemetry directly over Wi-Fi to a cloud endpoint.",
    icon: "Wifi",
    color: "#ec4899",
    requirement_rule: { type: "tutorials_completed", threshold: 10 }
  },
  {
    id: "badge-5",
    name: "Robot Builder",
    slug: "robot-builder",
    description: "Constructed an autonomous or smartphone-controlled robotic mechanism.",
    icon: "Bot",
    color: "#FF6B6B",
    requirement_rule: { type: "category_completed", threshold: 2, category: "robotics" }
  },
  {
    id: "badge-6",
    name: "Community Star",
    slug: "community-star",
    description: "Published a verified project showcase to the maker community.",
    icon: "Star",
    color: "#f59e0b",
    requirement_rule: { type: "showcases_created", threshold: 1 }
  },
  {
    id: "badge-7",
    name: "Streak Keeper",
    slug: "streak-keeper",
    description: "Logged into Circuitly and coded hardware projects 7 days in a row.",
    icon: "Flame",
    color: "#f97316",
    requirement_rule: { type: "streak_days", threshold: 7 }
  },
  {
    id: "badge-8",
    name: "Quiz Champion",
    slug: "quiz-champion",
    description: "Achieved a perfect 100% score on 5 consecutive hardware engineering quizzes.",
    icon: "Trophy",
    color: "#eab308",
    requirement_rule: { type: "quizzes_perfect", threshold: 5 }
  },
  {
    id: "badge-9",
    name: "Path Completer",
    slug: "path-completer",
    description: "Graduated with honors from a full Circuitly Learning Path.",
    icon: "GraduationCap",
    color: "#10b981",
    requirement_rule: { type: "paths_completed", threshold: 1 }
  },
  {
    id: "badge-10",
    name: "Verified Maker",
    slug: "verified-maker",
    description: "Earned peer validation by having a submitted showcase featured on the homepage.",
    icon: "CheckCircle",
    color: "#00E5A0",
    requirement_rule: { type: "showcases_featured", threshold: 1 }
  }
];

// 10 SAMPLE SHOWCASES
export const INITIAL_SHOWCASES: Showcase[] = [
  {
    id: "showcase-1",
    title: "Autonomous Plant Greenhouse with Automated Mist & Grow Lights",
    description: "Built an enclosed hydroponic herb garden using an Arduino Uno, DHT11 sensor, capacitive soil probe, and relay-actuated 12V LED grow spectrums. The mist nozzle automatically sprays for 3 seconds whenever ambient humidity dips below 45%!",
    image_url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    code: `// Automated Misting sketch snippet\nif (humidity < 45.0) { digitalWrite(MIST_PIN, LOW); delay(3000); digitalWrite(MIST_PIN, HIGH); }`,
    components: [
      { name: "Arduino Uno", quantity: 1, price: 3.5, buy_url: "" },
      { name: "12V Ultrasonic Mist Maker", quantity: 1, price: 8.0, buy_url: "" },
      { name: "Relay Module", quantity: 1, price: 2.5, buy_url: "" }
    ],
    status: "featured",
    likes_count: 42,
    user: {
      username: "elena_maker",
      full_name: "Elena Rostova",
      avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=elena"
    },
    created_at: "2024-03-02T10:00:00Z"
  },
  {
    id: "showcase-2",
    title: "Bluetooth Teleoperated Robotic Rover with FPV Camera",
    description: "Integrated the L298N motor driver with dual geared DC motors and an ESP32-CAM module mounted on a custom 3D printed pan/tilt bracket. Controlled entirely over smartphone touch gamepad!",
    image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    components: [
      { name: "ESP32-CAM", quantity: 1, price: 9.0, buy_url: "" },
      { name: "L298N Motor Driver", quantity: 1, price: 4.5, buy_url: "" },
      { name: "2WD Chassis", quantity: 1, price: 14.0, buy_url: "" }
    ],
    status: "featured",
    likes_count: 67,
    user: {
      username: "marcus_dev",
      full_name: "Marcus Vance",
      avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=marcus"
    },
    created_at: "2024-03-04T12:00:00Z"
  },
  {
    id: "showcase-3",
    title: "Retro 8-Bit Chiptune Synth Keyboard with 12 Tactile Switches",
    description: "Created a musical instrument with 12 keys, passive piezo buzzer, and dual rotary encoders to switch octaves and modify square wave duty cycles on the fly.",
    image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    components: [
      { name: "Arduino Nano", quantity: 1, price: 3.0, buy_url: "" },
      { name: "Piezo Buzzer", quantity: 2, price: 2.0, buy_url: "" },
      { name: "Tactile Switches", quantity: 12, price: 2.4, buy_url: "" }
    ],
    status: "approved",
    likes_count: 29,
    user: {
      username: "sound_ninja",
      full_name: "Tariq Aziz",
      avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=tariq"
    },
    created_at: "2024-03-05T15:30:00Z"
  },
  {
    id: "showcase-4",
    title: "Smart RFID Pet Feeder with Scheduled Portion Control",
    description: "An automated feeder for my cat! When the cat wears an RFID tag collar within 5cm of the bowl, an SG90 servo swivels open the food hopper for exactly 15 seconds.",
    image_url: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    components: [
      { name: "RC522 RFID Module", quantity: 1, price: 4.5, buy_url: "" },
      { name: "SG90 Servo", quantity: 1, price: 3.5, buy_url: "" }
    ],
    status: "approved",
    likes_count: 53,
    user: {
      username: "cat_engineer",
      full_name: "Sarah Lin",
      avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=sarah"
    },
    created_at: "2024-03-06T09:20:00Z"
  },
  {
    id: "showcase-5",
    title: "ESP8266 Live Crypto & Weather Ticker on SSD1306 OLED",
    description: "A compact desktop companion that fetches Bitcoin and Ethereum spot prices from public CoinGecko APIs and alternates with local temperature and barometric pressure graphs.",
    image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    components: [
      { name: "ESP8266 NodeMCU", quantity: 1, price: 5.5, buy_url: "" },
      { name: "0.96 inch OLED", quantity: 1, price: 4.5, buy_url: "" }
    ],
    status: "approved",
    likes_count: 38,
    user: {
      username: "crypto_coder",
      full_name: "David Kim",
      avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=david"
    },
    created_at: "2024-03-07T11:45:00Z"
  },
  {
    id: "showcase-6",
    title: "RGB Neopixel Ambilight Monitor Bias Light with Color Sensing",
    description: "Mounted a 60-LED WS2812B addressable strip to the back of my gaming monitor. A TCS34725 RGB color sensor dynamically casts matching ambient lighting onto the wall.",
    image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    components: [
      { name: "WS2812B Strip 1m", quantity: 1, price: 10.0, buy_url: "" },
      { name: "TCS34725 Color Sensor", quantity: 1, price: 6.0, buy_url: "" }
    ],
    status: "approved",
    likes_count: 45,
    user: {
      username: "neo_light",
      full_name: "Chloe Martin",
      avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=chloe"
    },
    created_at: "2024-03-08T14:10:00Z"
  },
  {
    id: "showcase-7",
    title: "Automatic Garage Parking Laser Assistant with Sonar Warning",
    description: "Replaced an old tennis ball hanging from the ceiling with an ultrasonic parking guidance system. When the car enters the bay, a 5mW red laser targets the dashboard.",
    image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    components: [
      { name: "HC-SR04 Sonar", quantity: 1, price: 2.5, buy_url: "" },
      { name: "Laser Diode Module 5V", quantity: 1, price: 1.5, buy_url: "" }
    ],
    status: "approved",
    likes_count: 31,
    user: {
      username: "garage_hacker",
      full_name: "Ben Jackson",
      avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=ben"
    },
    created_at: "2024-03-09T08:30:00Z"
  },
  {
    id: "showcase-8",
    title: "Solar Tracker: Dual-Axis Heliostat with 4 LDR Light Sensors",
    description: "Built an intelligent solar panel mount that steers dual servos towards maximum sunlight by comparing differential lux across four cross-baffled photoresistors.",
    image_url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    components: [
      { name: "LDR Photoresistors", quantity: 4, price: 0.8, buy_url: "" },
      { name: "MG996R High Torque Servos", quantity: 2, price: 14.0, buy_url: "" }
    ],
    status: "approved",
    likes_count: 58,
    user: {
      username: "green_energy",
      full_name: "Sophia Patel",
      avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=sophia"
    },
    created_at: "2024-03-10T16:00:00Z"
  },
  {
    id: "showcase-9",
    title: "Gesture Controlled Robotic Gripper Arm with Flex Sensors",
    description: "Equipped a cotton glove with 4 flex sensors along the fingers. As my hand opens and closes, an Arduino Uno reproduces my grip kinematics on a 4-DOF acrylic robotic arm.",
    image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    components: [
      { name: "Flex Sensors 2.2 inch", quantity: 4, price: 28.0, buy_url: "" },
      { name: "4-DOF Robotic Arm Kit", quantity: 1, price: 32.0, buy_url: "" }
    ],
    status: "approved",
    likes_count: 73,
    user: {
      username: "cyber_arm",
      full_name: "Alexey Volkov",
      avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=alexey"
    },
    created_at: "2024-03-11T13:45:00Z"
  },
  {
    id: "showcase-10",
    title: "Digital Spirit Level Inclinometer with MPU6050 Accelerometer",
    description: "Engineered a digital carpenter's level that uses an MPU6050 6-axis gyroscope/accelerometer over I2C to calculate pitch and roll degrees displayed on an OLED screen with acoustic beep alignment.",
    image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    components: [
      { name: "MPU6050 6-DOF Sensor", quantity: 1, price: 3.5, buy_url: "" },
      { name: "0.96 inch OLED", quantity: 1, price: 4.5, buy_url: "" }
    ],
    status: "pending",
    likes_count: 12,
    user: {
      username: "precision_tools",
      full_name: "Liam O'Connor",
      avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=liam"
    },
    created_at: "2024-03-12T09:10:00Z"
  }
];
