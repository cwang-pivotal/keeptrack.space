/* global

  satSet
  satCruncher
  orbitDisplay

*/

(function () {
  var missileManager = {};
    missileManager.missilesInUse = 0;
    missileManager.lastMissileError = '';
    missileManager.RussianICBM = [
      52 + (30 * 0.01666667), 82 + (45 * 0.01666667), 'Aleysk (SS-18)', 16000,
      50 + (45 * 0.01666667), 59 + (30 * 0.01666667), 'Dombarovskiy (SS-18)', 16000,
      55 + (20 * 0.01666667), 89 + (48 * 0.01666667), 'Uzhur (SS-18)', 16000,
      53 + (58 * 0.01666667), 57 + (50 * 0.01666667), 'Kartaly (SS-18)', 16000,
      52 + (19 * 0.01666667), 104 + (14 * 0.01666667), 'Irkutsk (SS-25)', 10500,
      56 + (22 * 0.01666667), 95 + (28 * 0.01666667), 'Kansk (SS-25)', 10500,
      54 + (2 * 0.01666667), 35 + (46 * 0.01666667), 'Kozel`sk (SS-19)', 10000,
      56 + (22 * 0.01666667), 92 + (25 * 0.01666667), 'Krasnoyarsk (SS-25)', 10500,
      58 + (4 * 0.01666667), 60 + (33 * 0.01666667), 'Nizhniy Tagil (SS-25)', 10500,
      55 + (20 * 0.01666667), 83 + (0 * 0.01666667), 'Novosibirsk (SS-25)', 10500,
      51 + (40 * 0.01666667), 45 + (34 * 0.01666667), 'Tatishchevo (SS-19)', 10000,
      51 + (40 * 0.01666667), 45 + (34 * 0.01666667), 'Tatishchevo (SS-27)', 10500,
      56 + (51 * 0.01666667), 40 + (32 * 0.01666667), 'Teykovo (SS-25)', 10500,
      56 + (38 * 0.01666667), 47 + (51 * 0.01666667), 'Yoshkar Ola (SS-25)', 10500,
      72.039545, 42.696683, 'Verkhoturye (SS-N-23A)', 8300,
      73.902056, 3.133463, 'Ekaterinburg (SS-N-23A)', 8300,
      76.502284, -158.871984, 'Tula (SS-N-23A)', 8300,
      82.256810, -10.161045, 'Bryansk (SS-N-23A)', 8300,
      81.564646, 32.553796, 'Karelia (SS-N-23A)', 8300,
      74.673660, 6.538173, 'Novomoskovsk (SS-N-23A)', 8300,
    ];
    missileManager.ChinaICBM = [
      32.997534, 112.537904, 'Nanyang (DF-31)', 8000,
      36.621398, 101.773908, 'Xining (DF-31)', 8000,
      37.797257, 97.079547, 'Delingha (DF-31A)', 11000,
      37.070450, 100.805779, 'Haiyan (DF-31A)', 11000,
      40.079969, 113.299940, 'Datong (DF-31A)', 11000,
      34.583156, 105.724525, 'Tainshui (DF-31A)', 11000,
      38.552936, 106.020538, 'Xixia (DF-31A)', 11000,
      27.242253, 111.465223, 'Shaoyang (DF-31A)', 11000,
      24.346580, 102.527838, 'Yuxi (DF-31A)', 11000,
      34.345845, 111.491062, 'Luoyang (DF-5A/B)', 13000,
      38.917086, 111.847057, 'Wuzhai (DF-5A/B)', 13000,
      40.615707, 115.107604, 'Xuanhua (DF-5A/B)', 13000,
      26.163848, 109.790408, 'Tongdao (DF-5A/B)', 13000,
      34.061291, 111.054379, 'Lushi (DF-5A/B)', 13000,
      30.691542, 118.437169, 'Jingxian (DF-5A/B)', 13000,
      37.707532, 116.271994, 'Jingxian (DF-5A/B)', 13000,
      27.415932, 111.792471, 'Hunan (DF-5A/B)', 13000,
      46.585153, 125.104037, 'Daqing City (DF-41)', 13500,
      32.154153, 114.099875, 'Xinyang City (DF-41)', 13500,
      40.441700, 85.530745, 'Xinjiang Province (DF-41)', 13500,
      31.271257, 88.699152, 'Tibet Province (DF-41)', 13500
    ];
    missileManager.NorthKoreanBM = [
      40.019, 128.193, 'Sinpo (KN-14)', 8000,
      39.365, 126.165, 'P`yong`an (KN-20)', 10000,
      39.046, 125.667, 'Pyongyang (KN-22)', 13000
    ];
    missileManager.UsaICBM = [
      48.420079, -101.333560, 'Minot (Minuteman III)', 13000,
      47.505958, -111.181776, 'Malmstrom (Minuteman III)', 13000,
      41.149931, -104.860645, 'F.E. Warren (Minuteman III)', 13000
    ];
    missileManager.globalBMTargets = [
      38.951, -77.013, 'Washington DC',
      40.679, -73.947, 'New York City',
      34.073, -118.248, 'Los Angeles',
      41.877, -87.622, 'Chicago',
      42.361, -71.058, 'Boston',
      47.749, -122.317, 'Seattle',
      25.784, -80.196, 'Miami',
      32.828, -96.759, 'Dallas',
      38.765, -104.837, 'Colorado Springs',
      41.330, -96.054, 'Omaha',
      19.832, -155.491, 'Hawaii',
      13.588, 144.922,  'Guam',
      51.506340, -0.097485, 'London',
      48.874195, 2.378987, 'Paris',
      40.449889, -3.717309, 'Madrid',
      41.931955, 12.520198, 'Rome',
      52.501746, 13.416486, 'Berlin',
      43.706946, -79.423854, 'Toronto',
      55.750246, 37.691525, 'Moscow',
      59.887535, 30.384090, 'St. Petersburg',
      55.017165, 82.965879, 'Novosibirsk',
      39.974338, 116.396057, 'Beijing',
      39.044051, 125.735244, 'Pyongyang'
    ];
  // Export
  window.missileManager = missileManager;

  // Settings
  var maxChineseMissiles = 252;
  var maxUSAMissiles = 350;
  var maxRussianMissiles = 400;
  var maxNorthKoreanMissiles = 30;

  // Internal Variables
  var USATargets = [
    40.679, -73.947, // NYC NY
    42.361, -71.058, // Boston MA
    41.755, -70.539, // Cape Cod MA
    41.763, -72.684, // Hartford CT
    42.101, -72.590, // Springfield MA
    39.408, -74.441, // Atlantic City NJ
    39.191, -75.534, // Dover DE
    39.331, -76.671, // Baltimore MD
    38.951, -77.013, // Washington DC
    37.608, -77.378, // Richmond VA (10)
    42.360, -83.048, // Detriot MI
    39.844, -86.172, // Indianapolis IN
    40.008, -83.000, // Columbus OH
    40.538, -79.934, // Pittsburgh PA
    40.034, -75.131, // Philadelphia PA
    47.749, -122.317, // Seattle WA
    45.700, -122.581, // Portland OR
    47.732, -117.389, // Spokane WA
    37.889, -122.562, // San Francisco CA
    36.257, -115.159, // Las Vegas NV (20)
    48.034, -101.295, // Minot ND
    49.134, -101.495, // Minot ND
    48.234, -100.295, // Minot ND
    48.334, -101.095, // Minot ND
    48.434, -101.295, // Minot ND
    47.948, -97.027, // Grand Forks ND
    45.107, -93.306, // Minneapolis MN
    47.092, -110.334, // Grand Falls MO
    47.292, -111.834, // Grand Falls MO
    47.592, -111.934, // Grand Falls MO (30)
    46.792, -111.334, // Grand Falls MO
    47.992, -111.534, // Grand Falls MO
    47.792, -110.734, // Grand Falls MO
    48.592, -111.534, // Grand Falls MO
    47.292, -111.334, // Grand Falls MO
    46.092, -111.134, // Grand Falls MO
    47.592, -110.034, // Grand Falls MO
    40.210, -104.811, // Cheyene WY
    41.510, -105.811, // Cheyene WY
    41.210, -104.211, // Cheyene WY (40)
    40.510, -104.211, // Cheyene WY
    41.210, -105.611, // Cheyene WY
    41.510, -104.611, // Cheyene WY
    41.210, -103.011, // Cheyene WY
    42.210, -104.011, // Cheyene WY
    41.910, -104.811, // Cheyene WY
    41.910, -104.811, // Cheyene WY
    34.048, -118.280, // Las Angeles CA
    19.832, -155.491, // Hawaii
    13.588, 144.922,  // Guam (50)
    36.318, -86.718, // Nashville TN
    32.782, -97.343, // Forth Worth TX
    32.584, -99.707, // Abilene TX
    35.208, -101.837, // Amarillo TX
    35.188, -106.595, // Albuquerque NM
    33.603, -111.965, // Phoenix AZ
    38.765, -104.837, // Colorado Springs CO
    38.737, -104.883, // Cheyenne Moutain CO
    39.847, -104.902, // Denver CO
    40.684, -105.059, // Fort Collins CO (60)
    40.852, -111.827, // Salt Lake City UT
    61.343, -150.187, // Anchorage AK
    64.940, -147.881, // Fairbanks AK
    58.488, -134.238, // Juneau AK
    30.460, -86.549, // Eglin AFB FL
    41.330, -96.054, // Omaha NE
    39.113276, -121.356137, // Beale AFB
    64.303735, -149.148768, // Clear AFS
    76.534322, -68.718288, // Thule AFB
    41.875523, -87.634038, // Chicago IL
    35.145865, -89.979153, // Memphis TN
    43.663448, -70.278127, // Portland MA
    43.612156, -116.231845 // Boise ID
  ];
  var EarthRadius, EarthMass, FuelDensity, BurnRate, WarheadMass, R, G, h;
  var missileArray = [];
  var MassRaidArray = [];

  // External Functions
  missileManager.MassRaidPre = function (time, simFile) {
    _clearMissiles();
    $.get(simFile, function (missileArray) {
      MassRaidArray = missileArray;
      var satSetLen = satSet.missileSats;
      for (var i = 0; i < missileArray.length; i++) {
        var x = satSetLen - 500 + i;
        missileArray[i].startTime = time;
        satSet.setSat(x, missileArray[i]);
        var MissileObject = satSet.getSat(x);
        if (MissileObject) {
          MissileObject.id = satSetLen - 500 + i;
          satCruncher.postMessage({
            id: MissileObject.id,
            typ: 'newMissile',
            ON: 'M00' + MissileObject.name,
            satId: MissileObject.id,
            static: MissileObject.static,
            missile: MissileObject.missile,
            active: MissileObject.active,
            type: MissileObject.type,
            name: MissileObject.name,
            latList: MissileObject.latList,
            lonList: MissileObject.lonList,
            altList: MissileObject.altList,
            startTime: MissileObject.startTime
          });
          orbitDisplay.updateOrbitBuffer(MissileObject.id, null, null, null, true, MissileObject.latList, MissileObject.lonList, MissileObject.altList, MissileObject.startTime);
        }
      }
    });
  };
  missileManager.MassRaid = function (time, BurnRate, RaidType) {

    var a = 0;
    var b = 500 - missileManager.missilesInUse;
    var i = 0;
    var missilesLaunched = 0;
    var isResetMissilesLaunched = false;
    var launchTime = 0;
    var success = 0;

    if (RaidType === 'Russia') {
      console.info('Russian Mass Raid Start: ' + Date.now());
      isResetMissilesLaunched = false;
      missilesLaunched = 0;
      for (a = 0; a < missileManager.RussianICBM.length / 4; a++) {
        if (isResetMissilesLaunched) {
          missilesLaunched = 0;
          isResetMissilesLaunched = false;
        }
        for (i = 0; i < USATargets.length / 2; i++) {
          if (b <= 500 - maxRussianMissiles) continue; // Don't Launch more than 252 Missiles
          if ((missileManager.RussianICBM[a * 4 + 3] !== 8300) && (missilesLaunched > 19)) continue; // 20 missiles per site
          if ((missileManager.RussianICBM[a * 4 + 3] === 8300) && (missilesLaunched > 11)) continue; // 12 missiles per sub
          if (Math.random() < 0.3) { // Skip over 70% of the cities to make it more random
            launchTime = (time * 1) + Math.random() * 240 * 1000;
            success = missileManager.Missile(missileManager.RussianICBM[a * 4], missileManager.RussianICBM[a * 4 + 1], USATargets[i * 2], USATargets[i * 2 + 1], 3, satSet.getSatData().length - b, launchTime,
            missileManager.RussianICBM[a * 4 + 2], 30, 2.9, BurnRate, missileManager.RussianICBM[a * 4 + 3], 'Russia');
            missilesLaunched += success; // Add 1 if missile passed range checks
            b -= success;
            console.info('Missiles Launched: ' + (500 - b) + ' - ' + missileManager.RussianICBM[a * 4 + 2]);
          }
        }
        if (b <= 500 - maxRussianMissiles) continue;
        if ((missileManager.RussianICBM[a * 4 + 3] !== 8300 && missilesLaunched <= 18 && i >= USATargets.length / 2) || // If less than 25 missiles launched redo that brigade
        (missileManager.RussianICBM[a * 4 + 3] === 8300 && missilesLaunched <= 10 && i >= USATargets.length / 2)) { // If submarine then limit to 16 missiles
          a--;
          isResetMissilesLaunched = false;
        } else {
          isResetMissilesLaunched = true;
        }
      }
    } else if (RaidType === 'China') {
      console.info('Chinese Mass Raid Start: ' + Date.now());
      isResetMissilesLaunched = false;
      missilesLaunched = 0;
      for (a = 0; a < missileManager.ChinaICBM.length / 4; a++) {
        if (isResetMissilesLaunched) {
          missilesLaunched = 0;
          isResetMissilesLaunched = false;
        }
        for (i = 0; i < USATargets.length / 2; i++) {
          if (b <= 500 - maxChineseMissiles) continue; // Don't Launch more than 252 Missiles
          if (missilesLaunched > 12) continue; // 12 missiles per brigade
          if (Math.random() < 0.3) { // Skip over 70% of the cities to make it more random
            launchTime = time + Math.random() * 240 * 1000;
            success = missileManager.Missile(missileManager.ChinaICBM[a * 4], missileManager.ChinaICBM[a * 4 + 1], USATargets[i * 2], USATargets[i * 2 + 1], 3, satSet.getSatData().length - b, launchTime,
            missileManager.ChinaICBM[a * 4 + 2], 30, 2.9, BurnRate, missileManager.ChinaICBM[a * 4 + 3], 'China');
            missilesLaunched += success; // Add 1 if missile passed range checks
            b -= success;
            console.info('Missiles Launched: ' + (500 - b));
          }
        }
        if (b <= 500 - maxChineseMissiles) continue;
        if (missilesLaunched <= 11 && i >= USATargets.length / 2) { // If less than 12 missiles launched redo that brigade
          a--;
          isResetMissilesLaunched = false;
        } else {
          isResetMissilesLaunched = true;
        }
      }
    } else if (RaidType === 'North Korea') {
      console.info('North Korea Mass Raid Start: ' + Date.now());
      isResetMissilesLaunched = false;
      missilesLaunched = 0;
      for (a = 0; a < missileManager.NorthKoreanBM.length / 4; a++) {
        if (isResetMissilesLaunched) {
          missilesLaunched = 0;
          isResetMissilesLaunched = false;
        }
        for (i = 0; i < USATargets.length / 2; i++) {
          if (b <= 500 - maxNorthKoreanMissiles) continue; // Don't Launch more than 252 Missiles
          if (missilesLaunched > 12) continue; // 12 missiles per brigade
          if (Math.random() < 0.3) { // Skip over 70% of the cities to make it more random
            launchTime = time + Math.random() * 240 * 1000;
            success = missileManager.Missile(missileManager.NorthKoreanBM[a * 4], missileManager.NorthKoreanBM[a * 4 + 1], USATargets[i * 2], USATargets[i * 2 + 1], 3, satSet.getSatData().length - b, launchTime,
            missileManager.NorthKoreanBM[a * 4 + 2], 30, 2.9, BurnRate, missileManager.NorthKoreanBM[a * 4 + 3], "North Korea");
            missilesLaunched += success; // Add 1 if missile passed range checks
            b -= success;
            console.info('Missiles Launched: ' + (500 - b));
          }
        }
        if (b <= 500 - maxNorthKoreanMissiles) continue;
        if (missilesLaunched <= 4 && i >= USATargets.length / 2) { // If less than 5 missiles launched redo that brigade
          a--;
          isResetMissilesLaunched = false;
        } else {
          isResetMissilesLaunched = true;
        }
      }
    } else if (RaidType === 'USA2Russia' || RaidType === 'USA2China' || RaidType === 'USA2NorthKorea') {
      console.info('USA Mass Raid Start: ' + Date.now());
      isResetMissilesLaunched = false;
      missilesLaunched = 0;
      for (a = 0; a < missileManager.UsaICBM.length / 4; a++) {
        i = 0;
        if (isResetMissilesLaunched) {
          missilesLaunched = 0;
          isResetMissilesLaunched = false;
        }
        if (RaidType === 'USA2Russia') {
          for (i = 0; i < missileManager.RussianICBM.length / 4; i++) {
            if (b <= 500 - maxUSAMissiles) continue; // Don't Launch more than 350 Missiles
            if (missilesLaunched > 50) continue; // 50 missiles per site
            if (Math.random() < 0.3) { // Skip over 70% of the cities to make it more random
              launchTime = time + Math.random() * 240 * 1000;
              success = missileManager.Missile(missileManager.UsaICBM[a * 4], missileManager.UsaICBM[a * 4 + 1], missileManager.RussianICBM[i * 4], missileManager.RussianICBM[i * 4 + 1], 3, satSet.getSatData().length - b, launchTime,
              missileManager.UsaICBM[a * 4 + 2], 30, 2.9, BurnRate, missileManager.UsaICBM[a * 4 + 3], 'United States');
              missilesLaunched += success; // Add 1 if missile passed range checks
              b -= success;
              console.info('Missiles Launched: ' + (500 - b));
            }
          }
          if (b > 500 - maxUSAMissiles) {
            if (missilesLaunched <= 50) {
              a--;
              isResetMissilesLaunched = false;
            } else {
              isResetMissilesLaunched = true;
            }
          }
        } else if (RaidType === 'USA2China') {
          for (i = 0; i < missileManager.ChinaICBM.length / 4; i++) {
            if (b <= 500 - maxUSAMissiles) continue; // Don't Launch more than 350 Missiles
            if (missilesLaunched > 50) continue; // 50 missiles per site
            if (Math.random() < 0.3) { // Skip over 70% of the cities to make it more random
              launchTime = time + Math.random() * 240 * 1000;
              success = missileManager.Missile(missileManager.UsaICBM[a * 4], missileManager.UsaICBM[a * 4 + 1], missileManager.ChinaICBM[i * 4], missileManager.ChinaICBM[i * 4 + 1], 3, satSet.getSatData().length - b, launchTime,
              missileManager.UsaICBM[a * 4 + 2], 30, 2.9, BurnRate, missileManager.UsaICBM[a * 4 + 3], 'United States');
              missilesLaunched += success; // Add 1 if missile passed range checks
              b -= success;
              console.info('Missiles Launched: ' + (500 - b));
            }
          }
          if (b > 500 - maxUSAMissiles) {
            if (missilesLaunched <= 50) {
              a--;
              isResetMissilesLaunched = false;
            } else {
              isResetMissilesLaunched = true;
            }
          }
        } else if (RaidType === 'USA2NorthKorea') {
          for (i = 0; i < missileManager.NorthKoreanBM.length / 4; i++) {
            if (b <= 500 - 18) continue; // Don't Launch more than 15 Missiles
            if (missilesLaunched > 5) continue; // 30 missiles per site
            if (Math.random() < 0.3) { // Skip over 70% of the cities to make it more random
              launchTime = time + Math.random() * 240 * 1000;
              success = missileManager.Missile(missileManager.UsaICBM[a * 4], missileManager.UsaICBM[a * 4 + 1], missileManager.NorthKoreanBM[i * 4], missileManager.NorthKoreanBM[i * 4 + 1], 3, satSet.getSatData().length - b, launchTime,
              missileManager.UsaICBM[a * 4 + 2], 30, 2.9, BurnRate, missileManager.UsaICBM[a * 4 + 3], 'United States');
              missilesLaunched += success; // Add 1 if missile passed range checks
              b -= success;
              console.info('Missiles Launched: ' + (500 - b));
            }
          }
          if (b > 500 - maxUSAMissiles) {
            if (missilesLaunched <= 5) {
              a--;
              isResetMissilesLaunched = false;
            } else {
              isResetMissilesLaunched = true;
            }
          }
        }
      }
      missileManager.missilesInUse = 500 - b;
    }
  };
  missileManager.Missile = function (CurrentLatitude, CurrentLongitude, TargetLatitude, TargetLongitude, NumberWarheads, MissileObjectNum, CurrentTime, MissileDesc, Length, Diameter, NewBurnRate, MaxMissileRange, country) {
    // This is the main function for this program. It calculates and designs the flight path of an intercontinental
    // ballistic missile (ICBM). This function calls upon many sub-functions to help it iteratively calculate many of the
    // changing variables as the rocket makes its path around the world. Changing variables that had to be taken into
    // account include:
    // Air density vs altitude
    // Air pressure vs altitude
    // Air temperature vs altitude
    // Drag coefficient vs mach number
    // Speed of sound vs altitude
    // Drag force vs time
    // Gravitational attraction vs altitude
    // Fuel mass vs time
    // Thrust vs time
    // Vertical velocity vs time
    // Angular velocity vs time
    // Vertical acceleration vs time
    // Angular acceleration vs time
    // Angular distance rocket travels vs time
    // Total distance rocket travels vs time
    // Many of these variables are dependent on each other. The inputs of this function are:
    // CurrentLatitude:  Latitude of the starting position
    // CurrentLongitude: Longitude of the starting position
    // TargetLatitude:   Latitude of the ending position
    // TargetLongitude:  Longitude of the ending position
    // NumberWarheads:   Number of warhead loaded onto the missile
    // The coordinates are to be inputed as degrees and NumberWarheads must be an intagure. The first thing the
    // program does is calculate everything regarding the path the rocket will take to minimize
    // distance needed to travel. It uses the CoordinateCalculator function to accomplish this.
    // It then calculates everything regarding the casing and fuel of the rocket. After calculating all
    // the necessary constants it starts its iterative calculation of the rockets actual path and collects
    // information into lists as it moves through its times steps. It changes its iterative approach once
    // the rocket runs out of fuel by dropping out everything used to calculate the trust. Once the rocket
    // reaches an altitude of zero meters it ends the iterations. Using all the information gathers it
    // presents them in the form of print statements and also plots.

    var MissileObject = satSet.getSat(MissileObjectNum);

    // Dimensions of the rocket
    Length = Length || 17;     // (m)
    Diameter = Diameter || 3.1;  // (m)

    if (CurrentLatitude > 90 || CurrentLatitude < -90) {
      console.error('Error: Current Latitude must be between 90 and -90 degrees');
      return 0;
    }
    if (CurrentLongitude > 180 || CurrentLongitude < -180) {
      console.error('Error: Current Longitude must be between 180 and -180 degrees');
      return 0;
    }
    if (TargetLatitude > 90 || TargetLatitude < -90) {
      // console.error('Error: Target Latitude must be between 90 and -90 degrees');
      missileManager.lastMissileError = 'Error: Target Latitude must be<br>between 90 and -90 degrees';
      return 0;
    }
    if (TargetLongitude > 180 || TargetLongitude < -180) {
      // console.error('Error: Target Longitude must be between 180 and -180 degrees');
      missileManager.lastMissileError = 'Error: Target Longitude must be<br>between 90 and -90 degrees';
      return 0;
    }
    if (NumberWarheads > 12) {
      console.error('Error: Rocket can hold up to 12 warheads');
      return 0;
    }
    if (parseFloat(NumberWarheads) % 1 > 0) {
      console.error('Error: The number of warheads must be a whole number');
      return 0;
    }

    EarthRadius = 6371000;       // (m)
    R = 287;                     // (J * K^-1 * kg^-1)
    G = 6.67384 * Math.pow(10, -11);       // (m^3 * kg^-1 * s^-2)
    EarthMass = 5.9726 * Math.pow(10, 24); // (kg)

    // This function will calculate the path the rocket will take in terms of coordinates
    var GoalDistance;
    var EstDistanceList = [];
    var LatList = [];
    var LongList = [];
    var EstLatList = [];
    var EstLongList = [];
    var Alpha1;

    var calculatedCoordinates = [];

    calculatedCoordinates = _CoordinateCalculator(CurrentLatitude, CurrentLongitude, TargetLatitude, TargetLongitude);
    EstLatList = calculatedCoordinates[0];
    EstLongList = calculatedCoordinates[1];
    Alpha1 = calculatedCoordinates[2];
    ArcLength = calculatedCoordinates[3];
    EstDistanceList = calculatedCoordinates[4];
    GoalDistance = calculatedCoordinates[5];

    if (ArcLength < 320000) {
      // console.error('Error: This missile has a minimum distance of 320 km.');
      // console.error('Please choose different target coordinates.');
      missileManager.lastMissileError = 'Error: This missile has a minimum distance of 320 km.';
      return 0;
    }

    if (ArcLength > MaxMissileRange * 1000) {
      // console.error('Error: This missile has a maximum distance of ' + MaxMissileRange + ' km.');
      // console.error('Please choose different target coordinates.');
      missileManager.lastMissileError = 'Error: This missile has a maximum distance of ' + MaxMissileRange + ' km.';
      return 0;
    }
    // Calculations for the warheads
    WarheadMass = 500 * NumberWarheads;                      // (Kg)
    var WarheadPayload = 475 * NumberWarheads;               // (KiloTons of TNT)
    var TotalDestruction = 92.721574 * NumberWarheads;       // (km^2)
    var PartialDestruction = 261.5888 * NumberWarheads;      // (km^2)

    // Calculations for the casing
    var Thickness = 0.050389573 * Diameter;                                                         // (m)
    var RocketArea = 0.25 * Math.PI * Math.pow(Diameter, 2);                                                 // (m^2)
    var RocketVolume = (RocketArea) * Length;                                                       // (m^3)
    var RocketCasingDensity = 1628.75;                                                              // (kg/m^3)http://scholar.lib.vt.edu/theses/available/etd-101198-161441/unrestricted/appendix.pdf
    var RocketCasingVolume = 0.25 * Math.PI * Length * (Math.pow(Diameter, 2) - Math.pow((Diameter - Thickness), 2)); // (m^3)
    var RocketCasingMass1 = RocketCasingDensity * RocketCasingVolume;                                                                                         // (kg)
    var RocketCasingMass2 = RocketCasingDensity * 0.25 * Math.PI * (Length * 0.4937) * (Math.pow(Diameter, 2) - Math.pow((Diameter - Thickness), 2));                           // (kg)
    var RocketCasingMass3 = RocketCasingDensity * 0.25 * Math.PI * (Length * 0.157) * (Math.pow((Diameter * 0.75), 2) - ((Diameter * 0.75) - Math.pow((Thickness) / 2), 2));    // (kg)

    // Calculations for the fuel
    BurnRate = NewBurnRate || 0.042;                                                            // (m/s)
    FuelDensity = 1750;                                                          // (kg/m^2)
    var FuelArea1 = 0.25 * Math.PI * Math.pow((Diameter - Thickness), 2);                 // (m^2)
    var FuelArea2 = 0.25 * Math.PI * Math.pow(((Diameter * 0.75) - Thickness), 2);        // (m^2)
    var FuelVolume = FuelArea1 * (Length * 0.651) + FuelArea2 * (Length * 0.178);// (m^3)
    var FuelMass = FuelDensity * FuelVolume;                                     // http://www.lr.tudelft.nl/en/organisation/departments/space-engineering/space-systems-engineering/expertise-areas/space-propulsion/design-of-elements/rocket-propellants/solids/
    var RocketMass = FuelMass + RocketCasingMass1 + WarheadMass;                 // (kg)

    // Here are the initial conditions
    var dthetadt = 0.001;    // (m/s)
    var drdt = 0.001;        // (m/s)
    var Altitude = 0;        // (m)
    var NozzleAltitude1 = 0; // (m)
    var Distance = 0;        // (m)
    var ArcDistance = 0;     // (m)
    var MassIn = 0;          // (kg/s)

    // Here are the time steps and counters
    // var y = 0;
    // var z = 0;
    var t = 0;
    h = 1;

    // Here are the definitions for all the lists
    var OppositeList = [];
    var AdjacentList = [];
    var WeightForceList = [];
    var AltitudeList = [];
    var DistanceList = [];
    var ArcDistanceList = [];
    var drdtList = [];
    var dthetadtList = [];
    var MList = [];
    var FuelMassList = [];
    var hList = [];
    var ThrustList = [];
    var NozzleAltitude = [];
    for (var i = 0; i < 100000; i++) {
      NozzleAltitude.push(i);
    }
    var ExitcDList = [];
    var Exitdr2dtList = [];
    var Exitdtheta2dtList = [];
    var ExitDragForceList = [];
    var ExitcList = [];
    var ExitAirDensityList = [];
    var ExitPatmList = [];
    var ExitTatmList = [];
    var EntercDList = [];
    var Enterdr2dtList = [];
    var Enterdtheta2dtList = [];
    var EnterDragForceList = [];
    var EnterAirDensityList = [];
    var EnterPatmList = [];
    var EnterTatmList = [];
    var EntercList = [];
    // var TotalDistanceList = [];
    var TimeList = [];
    var dtheta2dt, ArcLength, Distance, ArcVelocity, dr2dt, WeightForce, DragForce, Thrust, cD, M, c, AirDensity, Patm, Tatm;

    var AngleCoefficient = _Bisection(FuelArea1, FuelArea2, FuelMass, FuelVolume, RocketArea, Altitude, RocketCasingMass1, RocketCasingMass2, RocketCasingMass3, NozzleAltitude1, drdt, dthetadt, Distance, ArcDistance, MassIn, ArcLength, GoalDistance);

    while ((FuelMass / FuelDensity) / FuelVolume > 0.4 && Altitude >= 0) {
      var iterationFunOutput = _IterationFun(FuelArea1, FuelMass, RocketArea, Altitude, RocketCasingMass1, NozzleAltitude1, drdt, dthetadt, Distance, ArcDistance, MassIn, AngleCoefficient);
      FuelMass = iterationFunOutput[0];
      RocketMass = iterationFunOutput[1];
      Tatm = iterationFunOutput[2];
      Patm = iterationFunOutput[3];
      AirDensity = iterationFunOutput[4];
      c = iterationFunOutput[5];
      M = iterationFunOutput[6];
      cD = iterationFunOutput[7];
      Thrust = iterationFunOutput[8];
      DragForce = iterationFunOutput[9];
      WeightForce = iterationFunOutput[10];
      dr2dt = iterationFunOutput[11];
      drdt = iterationFunOutput[12];
      Altitude = iterationFunOutput[13];
      Distance = iterationFunOutput[14];
      ArcVelocity = iterationFunOutput[15];
      ArcDistance = iterationFunOutput[16];
      dtheta2dt = iterationFunOutput[17];
      dthetadt = iterationFunOutput[18];
      var NozzleAltitude2 = Altitude;

      AdjacentList.push(Math.cos(ArcDistance / EarthRadius) * (Altitude + EarthRadius));
      OppositeList.push(Math.sin(ArcDistance / EarthRadius) * (Altitude + EarthRadius));
      WeightForceList.push(WeightForce / RocketMass);
      ThrustList.push(Thrust / 1000);
      MList.push(M);
      AltitudeList.push(Math.round((Altitude / 1000) * 1e2) / 1e2);
      DistanceList.push(Distance / 1000);
      ArcDistanceList.push(ArcDistance / 1000);
      for (i = 0; i < EstDistanceList.length; i++) {
        if (EstDistanceList[i] <= (Distance / 1000) && !(EstDistanceList[i + 1] <= (Distance / 1000))) {
          LatList.push(Math.round(EstLatList[i] * 1e2) / 1e2);
          LongList.push(Math.round(EstLongList[i] * 1e2) / 1e2);
          // if (!CurrentTime) console.log(t + 's - Altitude: ' + (Altitude/1000).toFixed(1) + ' - Dist: ' + EstDistanceList[i].toFixed(1) + ' - Lat: ' + EstLatList[i].toFixed(1) + ' - Lon: ' + EstLongList[i].toFixed(1));
          // if (CurrentTime) console.log(new Date(t) + ' - Altitude: ' + (Altitude/1000).toFixed(1) + ' - Lat: ' + EstLatList[i].toFixed(1) + ' - Lon: ' + EstLongList[i].toFixed(1));
          break;
        }
      }
      drdtList.push(drdt);
      dthetadtList.push(dthetadt);
      var hListSum;
      for (i = 0; i < hList.length; i++) {
        hListSum += hList[i];
      }
      hList.push(h + hListSum);
      Exitdr2dtList.push(dr2dt);
      Exitdtheta2dtList.push(dtheta2dt);
      if (Altitude < 120000) ExitDragForceList.push(DragForce / 1000);
      if (Altitude < 100000) ExitcList.push(c);
      if (Altitude < 120000) ExitAirDensityList.push(AirDensity);
      if (Altitude < 120000) ExitPatmList.push(Patm / 101325);
      if (Altitude < 100000) ExitTatmList.push(Tatm);
      if (Altitude < 100000) ExitcDList.push(cD);
      if (FuelMass > 0) FuelMassList.push(FuelMass);
      TimeList.push(t);
      t += 1;
    }
    var FirstStageTime = t;

    while ((FuelMass / FuelDensity) / FuelVolume > 0.19 && Altitude >= 0) {
      iterationFunOutput = _IterationFun(FuelArea1, FuelMass, RocketArea, Altitude, RocketCasingMass2, NozzleAltitude2, drdt, dthetadt, Distance, ArcDistance, MassIn, AngleCoefficient);
      FuelMass = iterationFunOutput[0];
      RocketMass = iterationFunOutput[1];
      Tatm = iterationFunOutput[2];
      Patm = iterationFunOutput[3];
      AirDensity = iterationFunOutput[4];
      c = iterationFunOutput[5];
      M = iterationFunOutput[6];
      cD = iterationFunOutput[7];
      Thrust = iterationFunOutput[8];
      DragForce = iterationFunOutput[9];
      WeightForce = iterationFunOutput[10];
      dr2dt = iterationFunOutput[11];
      drdt = iterationFunOutput[12];
      Altitude = iterationFunOutput[13];
      Distance = iterationFunOutput[14];
      ArcVelocity = iterationFunOutput[15];
      ArcDistance = iterationFunOutput[16];
      dtheta2dt = iterationFunOutput[17];
      dthetadt = iterationFunOutput[18];
      var NozzleAltitude3 = Altitude;

      AdjacentList.push(Math.cos(ArcDistance / EarthRadius) * (Altitude + EarthRadius));
      OppositeList.push(Math.sin(ArcDistance / EarthRadius) * (Altitude + EarthRadius));
      WeightForceList.push(WeightForce / RocketMass);
      ThrustList.push(Thrust / 1000);
      MList.push(M);
      AltitudeList.push(Math.round((Altitude / 1000) * 1e2) / 1e2);
      DistanceList.push(Distance / 1000);
      ArcDistanceList.push(ArcDistance / 1000);
      for (i = 0; i < EstDistanceList.length; i++) {
        if (EstDistanceList[i] <= (Distance / 1000) && !(EstDistanceList[i + 1] <= (Distance / 1000))) {
          LatList.push(Math.round(EstLatList[i] * 1e2) / 1e2);
          LongList.push(Math.round(EstLongList[i] * 1e2) / 1e2);
          // if (!CurrentTime) console.log(t + 's - Altitude: ' + (Altitude/1000).toFixed(1) + ' - Dist: ' + EstDistanceList[i].toFixed(1) + ' - Lat: ' + EstLatList[i].toFixed(1) + ' - Lon: ' + EstLongList[i].toFixed(1));
          // if (CurrentTime) console.log(new Date(t) + ' - Altitude: ' + (Altitude/1000).toFixed(1) + ' - Lat: ' + EstLatList[i].toFixed(1) + ' - Lon: ' + EstLongList[i].toFixed(1));
          break;
        }
      }
      drdtList.push(drdt);
      dthetadtList.push(dthetadt);
      hListSum;
      for (i = 0; i < hList.length; i++) {
        hListSum += hList[i];
      }
      hList.push(h + hListSum);
      Exitdr2dtList.push(dr2dt);
      Exitdtheta2dtList.push(dtheta2dt);
      if (Altitude < 120000) ExitDragForceList.push(DragForce / 1000);
      if (Altitude < 100000) ExitcList.push(c);
      if (Altitude < 120000) ExitAirDensityList.push(AirDensity);
      if (Altitude < 120000) ExitPatmList.push(Patm / 101325);
      if (Altitude < 100000) ExitTatmList.push(Tatm);
      if (Altitude < 100000) ExitcDList.push(cD);
      if (FuelMass > 0) FuelMassList.push(FuelMass);
      TimeList.push(t);
      t += 1;
    }
    var SecondStageTime = t;

    while ((FuelMass / FuelDensity) / FuelVolume > 0 && Altitude >= 0) {
      iterationFunOutput = _IterationFun(FuelArea2, FuelMass, RocketArea, Altitude, RocketCasingMass3, NozzleAltitude3, drdt, dthetadt, Distance, ArcDistance, MassIn, AngleCoefficient);
      FuelMass = iterationFunOutput[0];
      RocketMass = iterationFunOutput[1];
      Tatm = iterationFunOutput[2];
      Patm = iterationFunOutput[3];
      AirDensity = iterationFunOutput[4];
      c = iterationFunOutput[5];
      M = iterationFunOutput[6];
      cD = iterationFunOutput[7];
      Thrust = iterationFunOutput[8];
      DragForce = iterationFunOutput[9];
      WeightForce = iterationFunOutput[10];
      dr2dt = iterationFunOutput[11];
      drdt = iterationFunOutput[12];
      Altitude = iterationFunOutput[13];
      Distance = iterationFunOutput[14];
      ArcVelocity = iterationFunOutput[15];
      ArcDistance = iterationFunOutput[16];
      dtheta2dt = iterationFunOutput[17];
      dthetadt = iterationFunOutput[18];

      AdjacentList.push(Math.cos(ArcDistance / EarthRadius) * (Altitude + EarthRadius));
      OppositeList.push(Math.sin(ArcDistance / EarthRadius) * (Altitude + EarthRadius));
      WeightForceList.push(WeightForce / RocketMass);
      ThrustList.push(Thrust / 1000);
      MList.push(M);
      AltitudeList.push(Math.round((Altitude / 1000) * 1e2) / 1e2);
      DistanceList.push(Distance / 1000);
      ArcDistanceList.push(ArcDistance / 1000);
      for (i = 0; i < EstDistanceList.length; i++) {
        if (EstDistanceList[i] <= (Distance / 1000) && !(EstDistanceList[i + 1] <= (Distance / 1000))) {
          LatList.push(Math.round(EstLatList[i] * 1e2) / 1e2);
          LongList.push(Math.round(EstLongList[i] * 1e2) / 1e2);
          // if (!CurrentTime) console.log(t + 's - Altitude: ' + (Altitude/1000).toFixed(1) + ' - Dist: ' + EstDistanceList[i].toFixed(1) + ' - Lat: ' + EstLatList[i].toFixed(1) + ' - Lon: ' + EstLongList[i].toFixed(1));
          // if (CurrentTime) console.log(new Date(t) + ' - Altitude: ' + (Altitude/1000).toFixed(1) + ' - Lat: ' + EstLatList[i].toFixed(1) + ' - Lon: ' + EstLongList[i].toFixed(1));
          break;
        }
      }
      drdtList.push(drdt);
      dthetadtList.push(dthetadt);
      hListSum;
      for (i = 0; i < hList.length; i++) {
        hListSum += hList[i];
      }
      hList.push(h + hListSum);
      Exitdr2dtList.push(dr2dt);
      Exitdtheta2dtList.push(dtheta2dt);
      if (Altitude < 120000) ExitDragForceList.push(DragForce / 1000);
      if (Altitude < 100000) ExitcList.push(c);
      if (Altitude < 120000) ExitAirDensityList.push(AirDensity);
      if (Altitude < 120000) ExitPatmList.push(Patm / 101325);
      if (Altitude < 100000) ExitTatmList.push(Tatm);
      if (Altitude < 100000) ExitcDList.push(cD);
      if (FuelMass > 0) FuelMassList.push(FuelMass);
      TimeList.push(t);
      t += 1;
    }
    var ThirdStageTime = t;

    while (Altitude > 0) {
      FuelMass = 0;
      iterationFunOutput = _IterationFun(FuelArea2, FuelMass, RocketArea, Altitude, RocketCasingMass3, NozzleAltitude3, drdt, dthetadt, Distance, ArcDistance, MassIn, AngleCoefficient);
      FuelMass = iterationFunOutput[0];
      RocketMass = iterationFunOutput[1];
      Tatm = iterationFunOutput[2];
      Patm = iterationFunOutput[3];
      AirDensity = iterationFunOutput[4];
      c = iterationFunOutput[5];
      M = iterationFunOutput[6];
      cD = iterationFunOutput[7];
      Thrust = iterationFunOutput[8];
      DragForce = iterationFunOutput[9];
      WeightForce = iterationFunOutput[10];
      dr2dt = iterationFunOutput[11];
      drdt = iterationFunOutput[12];
      Altitude = iterationFunOutput[13];
      Distance = iterationFunOutput[14];
      ArcVelocity = iterationFunOutput[15];
      ArcDistance = iterationFunOutput[16];
      dtheta2dt = iterationFunOutput[17];
      dthetadt = iterationFunOutput[18];
      AdjacentList.push(Math.cos(ArcDistance / EarthRadius) * (Altitude + EarthRadius));
      OppositeList.push(Math.sin(ArcDistance / EarthRadius) * (Altitude + EarthRadius));
      WeightForceList.push(WeightForce / RocketMass);
      MList.push(M);
      AltitudeList.push(Math.round((Altitude / 1000) * 1e2) / 1e2);
      DistanceList.push(Distance / 1000);
      ArcDistanceList.push(ArcDistance / 1000);
      for (i = 0; i < EstDistanceList.length; i++) {
        if (EstDistanceList[i] <= (Distance / 1000) && !(EstDistanceList[i + 1] <= (Distance / 1000))) {
          LatList.push(Math.round(EstLatList[i] * 1e2) / 1e2);
          LongList.push(Math.round(EstLongList[i] * 1e2) / 1e2);
          // if (!CurrentTime) console.log(t + 's - Altitude: ' + (Altitude/1000).toFixed(1) + ' - Dist: ' + EstDistanceList[i].toFixed(1) + ' - Lat: ' + EstLatList[i].toFixed(1) + ' - Lon: ' + EstLongList[i].toFixed(1));
          // if (CurrentTime) console.log(new Date(t) + ' - Altitude: ' + (Altitude/1000).toFixed(1) + ' - Lat: ' + EstLatList[i].toFixed(1) + ' - Lon: ' + EstLongList[i].toFixed(1));
          break;
        }
      }
      drdtList.push(drdt);
      dthetadtList.push(dthetadt);
      if (Altitude < 120000) EnterDragForceList.push(DragForce / 1000);
      if (Altitude < 120000) EntercList.push(c);
      if (Altitude < 120000) EnterAirDensityList.push(AirDensity);
      if (Altitude < 120000) EnterPatmList.push(Patm / 101325);
      if (Altitude < 120000) EnterTatmList.push(Tatm);
      if (Altitude < 120000) Enterdr2dtList.push(dr2dt);
      if (Altitude < 120000) Enterdtheta2dtList.push(dtheta2dt);
      if (Altitude < 120000) EntercDList.push(cD);
      TimeList.push(t);
      t += 1;
    }
    var impactTime = t;

    // This will find the max acceleration, max velocity, and max height out of their lists
    var MaxVerticalAcceleration = Exitdr2dtList.reduce(function (a, b) {
      return Math.max(a, b);
    });
    var MaxAngularAcceleration = Exitdtheta2dtList.reduce(function (a, b) {
      return Math.max(a, b);
    });
    var MaxVerticalVelocity = drdtList.reduce(function (a, b) {
      return Math.max(a, b);
    });
    var MaxAngularVelocity = dthetadtList.reduce(function (a, b) {
      return Math.max(a, b);
    });
    var MaxAltitude = AltitudeList.reduce(function (a, b) {
      return Math.max(a, b);
    });

    // console.log('Max Altitude: ' + MaxAltitude);

    for (var i = 0; i < AltitudeList.length; i++) { if (AltitudeList[i] === MaxAltitude) var MaxAltitudePossition = i; }
    for (i = 0; i < drdtList.length; i++) { if (drdtList[i] === MaxVerticalVelocity) var MaxVerticalVelocityPossition = i; }
    var AverageAngularVelocity = 0;
    for (i = 0; i < dthetadtList.length; i++) {
      if (dthetadtList[i] === MaxAngularVelocity) var MaxAngularVelocityPossition = i;
      AverageAngularVelocity += dthetadtList[i];
    }
    for (i = 0; i < Exitdr2dtList.length; i++) { if (Exitdr2dtList[i] === MaxVerticalAcceleration) var MaxVerticalAccelerationPossition = i; }
    for (i = 0; i < Exitdtheta2dtList.length; i++) { if (Exitdtheta2dtList[i] === MaxAngularAcceleration) var MaxAngularAccelerationPossition = i; }

    // console.log('Max Angular Velocity: ' + MaxAngularVelocity / 1000);
    // console.log('Average Angular Velocity: ' + AverageAngularVelocity / dthetadtList.length / 1000);

    // This will print the variables at their max value with its respective time in minutes
    // It takes into acount the difference in the singular and plural form of the words 'minutes' and 'seconds'

    // if (CurrentTime) {
    //   console.info('First Stage = ' + new Date(FirstStageTime));
    //   console.info('Second Stage = ' + new Date(SecondStageTime));
    //   console.info('Third Stage = ' + new Date(ThirdStageTime));
    //   console.info('Impact Time = ' + new Date(impactTime));
    // } else {
    // console.info('First Stage = ' + FirstStageTime + ' sec (' + FirstStageTime / 60 + ' min)');
    // console.info('Second Stage = ' + SecondStageTime + ' sec (' + SecondStageTime / 60 + ' min)');
    // console.info('Third Stage = ' + ThirdStageTime + ' sec (' + ThirdStageTime / 60 + ' min)');
    // console.info('Impact Time = ' + impactTime + ' sec (' + impactTime / 60 + ' min)');
    // }
    // console.info('ArcDistance = ' + Math.round(ArcDistance / 1000, 2) + 'Km');
    // console.info('Distance to target is' + Math.round(ArcLength / 1000, 2) + 'km');
    // console.info('Direction to target is' + Math.round(Alpha1, 2) + ' degrees from north');
    // console.info('Warhead payload delivered:' + WarheadPayload + 'Kilotons of TNT');
    // console.info('Total Blast area for complete structural destruction:' + Math.round(TotalDestruction, 2) + 'Square Kilometers');
    // console.info('Total Blast area for partial structural destruction:' + Math.round(PartialDestruction, 2) + 'Square Kilometers');

    if (MissileObject) {
      MissileObject.static = false;
      MissileObject.altList = AltitudeList;
      MissileObject.latList = LatList;
      MissileObject.lonList = LongList;
      // MissileObject.timeList = TimeList;
      MissileObject.active = true;
      MissileObject.missile = true;
      MissileObject.type = '';
      MissileObject.ON = 'RV_' + MissileObject.name;
      MissileObject.satId = MissileObjectNum;
      MissileObject.id = MissileObjectNum;
      MissileObject.maxAlt = MaxAltitude;
      MissileObject.startTime = CurrentTime;
      if (country) MissileObject.C = country;

      if (MissileObject.apogee) delete MissileObject.apogee;
      if (MissileObject.argPe) delete MissileObject.argPe;
      if (MissileObject.eccentricity) delete MissileObject.eccentricity;
      if (MissileObject.inclination) delete MissileObject.inclination;
      // maxAlt is used for zoom controls
      // if (MissileObject.maxAlt) delete MissileObject.maxAlt;
      if (MissileObject.meanMotion) delete MissileObject.meanMotion;
      if (MissileObject.perigee) delete MissileObject.perigee;
      if (MissileObject.period) delete MissileObject.period;
      if (MissileObject.raan) delete MissileObject.raan;
      if (MissileObject.semiMajorAxis) delete MissileObject.semiMajorAxis;
      if (MissileObject.semiMinorAxis) delete MissileObject.semiMinorAxis;

      if (MissileDesc) MissileObject.desc = MissileDesc;
      missileArray.push(MissileObject);
      satCruncher.postMessage({
        id: MissileObject.id,
        typ: 'newMissile',
        ON: 'RV_' + MissileObject.name, // Don't think satCruncher needs this
        satId: MissileObject.id,
        static: MissileObject.static,
        missile: MissileObject.missile,
        active: MissileObject.active,
        type: MissileObject.type,
        name: MissileObject.name,
        latList: MissileObject.latList,
        lonList: MissileObject.lonList,
        altList: MissileObject.altList,
        startTime: MissileObject.startTime
      });
      orbitDisplay.updateOrbitBuffer(MissileObjectNum, null, null, null, true, MissileObject.latList, MissileObject.lonList, MissileObject.altList, MissileObject.startTime);

      // if (MissileObject.latList) delete MissileObject.latList;
      // if (MissileObject.lonList) delete MissileObject.lonList;
      // if (MissileObject.altList) delete MissileObject.altList;
      // if (MissileObject.startTime) delete MissileObject.startTime;
    }
    missileManager.missilesInUse++;
    missileManager.lastMissileError = 'Missile Named RV_' + MissileObject.name + '<br>has been created.';
    return 1; // Successful Launch
  };
  missileManager.getMissileTEARR = function (missile, sensor) {
    var currentTEARR = {}; // Most current TEARR data that is set in satellite object and returned.
    // Set default timing settings. These will be changed to find look angles at different times in future.
    timeManager.propRealTime = Date.now();
    var propOffset = timeManager.getPropOffset();               // offset letting us propagate in the future (or past)
    var now = timeManager.propTimeCheck(propOffset, timeManager.propRealTime);
    var j = timeManager.jday(now.getUTCFullYear(),
    now.getUTCMonth() + 1, // NOTE:, this function requires months in range 1-12.
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()); // Converts time to jday (TLEs use epoch year/day)
    j += now.getUTCMilliseconds() * MILLISECONDS_PER_DAY;
    var gmst = satellite.gstime(j);

    // If no sensor passed to function then try to use the 'currentSensor'
    if (typeof sensor == 'undefined') {
      if (typeof satellite.currentSensor == 'undefined') {
        throw 'getTEARR requires a sensor or for a sensor to be currently selected.';
      } else {
        sensor = satellite.currentSensor;
      }
    }
    // If sensor's observerGd is not set try to set it using it parameters
    if (typeof sensor.observerGd == 'undefined') {
      try {
        sensor.observerGd = {
          height: sensor.obshei,
          latitude: sensor.lat,
          longitude: sensor.long
        };
      } catch (e) {
        throw 'observerGd is not set and could not be guessed.';
      }
    }

    // Set default timing settings. These will be changed to find look angles at different times in future.
    timeManager.propRealTime = Date.now();
    propOffset = timeManager.getPropOffset();               // offset letting us propagate in the future (or past)
    var tLen = missile.altList.length;
    for (var t = 0; t < tLen; t++) {
      if (missile.startTime + t * 1000 > now) {
        curMissileTime = t;
        break;
      }
    }
    cosLat = Math.cos(missile.latList[curMissileTime] * DEG2RAD);
    sinLat = Math.sin(missile.latList[curMissileTime] * DEG2RAD);
    cosLon = Math.cos((missile.lonList[curMissileTime] * DEG2RAD) + gmst);
    sinLon = Math.sin((missile.lonList[curMissileTime] * DEG2RAD) + gmst);

    x = (RADIUS_OF_EARTH + missile.altList[curMissileTime]) * cosLat * cosLon;
    y = (RADIUS_OF_EARTH + missile.altList[curMissileTime]) * cosLat * sinLon;
    z = (RADIUS_OF_EARTH + missile.altList[curMissileTime]) * sinLat;

    try {
      gpos = satellite.eciToGeodetic({x: x, y: y, z: z}, gmst);
      currentTEARR.alt = gpos.height;
      currentTEARR.lon = gpos.longitude;
      currentTEARR.lat = gpos.latitude;
      positionEcf = satellite.eciToEcf({x: x, y: y, z: z}, gmst);
      lookAngles = satellite.ecfToLookAngles(sensor.observerGd, positionEcf);
      currentTEARR.azimuth = lookAngles.azimuth * RAD2DEG;
      currentTEARR.elevation = lookAngles.elevation * RAD2DEG;
      currentTEARR.range = lookAngles.rangeSat;
    } catch (e) {
      currentTEARR.alt = 0;
      currentTEARR.lon = 0;
      currentTEARR.lat = 0;
      positionEcf = 0;
      lookAngles = 0;
      currentTEARR.azimuth = 0;
      currentTEARR.elevation = 0;
      currentTEARR.range = 0;
    }

    // Check if satellite is in field of view of a sensor.
    if (sensor.obsminaz > sensor.obsmaxaz) {
      if (((currentTEARR.azimuth >= sensor.obsminaz || currentTEARR.azimuth <= sensor.obsmaxaz) &&
      (currentTEARR.elevation >= sensor.obsminel && currentTEARR.elevation <= sensor.obsmaxel) &&
      (currentTEARR.range <= sensor.obsmaxrange && currentTEARR.range >= sensor.obsminrange)) ||
      ((currentTEARR.azimuth >= sensor.obsminaz2 || currentTEARR.azimuth <= sensor.obsmaxaz2) &&
      (currentTEARR.elevation >= sensor.obsminel2 && currentTEARR.elevation <= sensor.obsmaxel2) &&
      (currentTEARR.range <= sensor.obsmaxrange2 && currentTEARR.range >= sensor.obsminrange2))) {
        currentTEARR.inview = true;
      } else {
        currentTEARR.inview = false;
      }
    } else {
      if (((currentTEARR.azimuth >= sensor.obsminaz && currentTEARR.azimuth <= sensor.obsmaxaz) &&
      (currentTEARR.elevation >= sensor.obsminel && currentTEARR.elevation <= sensor.obsmaxel) &&
      (currentTEARR.range <= sensor.obsmaxrange && currentTEARR.range >= sensor.obsminrange)) ||
      ((currentTEARR.azimuth >= sensor.obsminaz2 && currentTEARR.azimuth <= sensor.obsmaxaz2) &&
      (currentTEARR.elevation >= sensor.obsminel2 && currentTEARR.elevation <= sensor.obsmaxel2) &&
      (currentTEARR.range <= sensor.obsmaxrange2 && currentTEARR.range >= sensor.obsminrange2))) {
        currentTEARR.inview = true;
      } else {
        currentTEARR.inview = false;
      }
    }
    satellite.currentTEARR = currentTEARR;
    return currentTEARR;
  };

  // Internal Functions
  function _Pressure (Altitude) {
      // This function calculates the atmospheric pressure. The only iMathut is the
      // Altitude. The variables in the function are:

      // Po:   Atmospheric pressure at sea level
      // mol:  Amount of air in one gram
      // Tsea: Temperature at sea level
      // R:    Gas constant for air
      // g:    Gravitational constant

      // The function will return the calculated atmospheric pressure

    var Po = 101325;     // (Pa)
    var mol = 0.02897;   // (mol)
    var Tsea = 288;      // (K)
    var R = 8.314510;    // (J / K mol)
    var g = 9.81;        // (m/s^2)
    return Po * Math.exp((-mol * g * Altitude) / (R * Tsea)); // (Pa)
  }
  function _Temperature (Altitude) {
    // This function calculates the atmospheric temperature at any given altitude.
    // The function has one iMathut for altitude. Because atmospheric temperature can not
    // be represented as one equation, this function is made up of a series of curve fits
    // which each make up a section of the atmosphere. After an elevation of 120 km
    // the atmosphere becomes so sparse that it become negligible so the function keeps a
    // constant temperature after that point.

    Altitude = Altitude / 1000;                                             // (km)
    if (Altitude < 12.5) return 276.642857143 - 5.02285714286 * Altitude; // (K)
    if (Altitude < 20) return 213.0;                                      // (K)
    if (Altitude < 47.5) return 171.224358974 + 2.05384615385 * Altitude; // (K)
    if (Altitude < 52.5) return 270.0;                                    // (K)
    if (Altitude < 80) return 435.344405594 - 3.13916083916 * Altitude;   // (K)
    if (Altitude < 90) return 183.0;                                      // (K)
    if (Altitude < 110) return -221.111111111 + 4.47 * Altitude;          // (K)
    if (Altitude < 120) return -894.0 + 10.6 * Altitude;                  // (K)
    if (Altitude >= 120) return -894.0 + 10.6 * 120;                      // (K)
  }
  function _CD (M) {
    // This function calculates the drag coefficient of the rocket. This function is based
    // off of a plot that relates the drag coefficient with the mach number of the rocket.
    // Because the plot can not be represented with one equation it is broken up into multiple
    // curve fits. The only iMathut for the function is the mach number the rocket is traveling.

    if (M < 0.5) return 0.125;
    if (M < 1.1875) return -0.329086061307 + 2.30117394072 * M + -4.06597222013 * Math.pow(M, 2) + 3.01851851676 * Math.pow(M, 3) + -0.666666666129 * Math.pow(M, 4);
    if (M < 1.625) return 0.10937644721 + -4.61979595244 * M + 9.72917139612 * Math.pow(M, 2) + -6.33333563852 * Math.pow(M, 3) + 1.33333375211 * Math.pow(M, 4);
    if (M < 3.625) return 0.97916002909 + -0.540978181863 * M + 0.125235817144 * Math.pow(M, 2) + -0.00666103733277 * Math.pow(M, 3) + -0.000558009790208 * Math.pow(M, 4);
    if (M > 3.625) return 0.25;
  }
  function _ThrustFun (MassOut, Altitude, FuelArea, NozzleAltitude) {
    // This function calculates the thrust force of the rocket by maximizing the efficiency
    // through designing the correct shaped nozzle for the given rocket scenario. For this
    // function is gives the option for stages of the rocket to be introduced. Theoretically
    // this function can have an unlimited amount of stages but for this particular use there
    // will only be 3 stages. The iMathuts for the function are:

    // MassOut:            Mass leaving the nozzle
    // Altitude:           Rockets current elevation
    // FuelArea:           Burn area in the combustion chamber
    // NozzleAltitude:     Altitude immediately after a rocket stage detaches

    // The constants for the function were based off of data found for the Trident II Intercontinental
    // ballistic missile. These constants are:
    // k:  Specific heat ratio for the fuel
    // Ru:  Universal gas constant
    // Tc: Chamber temperature
    // Pc: Chamber pressure
    // Mw: Molecular weight of the fuel
    // q:  Mass flow out through the nozzle
    // Pa: Atmospheric pressure used for optimizing nozzle diameters
    // The iteratively calculated variables for this function are:
    // Pe: Current atmospheric pressure
    // Pt: Throat pressure
    // Tt: Throat temperature
    // At: Throat area
    // Nm: Mach number of the exiting gas
    // Ae: Exit area of the nozzle
    // Ve: Velocity of the fuel exiting the nozzle
    // After making all of these calculations the function will return the force generated by the trust
    // of the fuel in units of Newtons. This function will also make sure that the exit nozzle area will
    // not exceed that of the cross sectional area for the inside of rocket casing.

    var k = 1.2;                                                                                      // Heat Ratio
    var Ru = 8314.4621;                                                                               // Universal Gas Constant (m^3 Pa / K mol)
    var Tc = 3700;                                                                                    // (K)
    var Pc = 25 * Math.pow(10, 6);                                                                           // Chamber Pressure (Pa)
    var Mw = 22;                                                                                      // Molecular Weight
    var q = MassOut;                                                                                  // Mass Flow Rate (kg/s)
    var Pa = _Pressure(NozzleAltitude);                                                                // Ambient pressure used to calculate nozzle (Pa)
    var Pe = _Pressure(Altitude);                                                                      // Actual Atmospheric Pressure (Pa)
    var Pt = Math.pow(Pc * (1 + (k - 1) / 2), (-k / (k - 1)));                                        // Throat Pressure (Pa)
    var Tt = Tc / (1 + (k - 1) / 2);                                                                  // Throat Temperature (k)
    var At = (q / Pt) * Math.sqrt((Ru * Tt) / (Mw * k));                                              // Throat Area (m^2)
    var Nm = Math.sqrt(2 / (k - 1) * Math.pow((Pc / Pa), ((k - 1) / k) - 1));                                // Mach Number
    var Ae = (At / Nm) * Math.pow((1 + ((k - 1) / 2) * Math.pow(Nm, 2) / ((k + 1) / 2)), ((k + 1) / (2 * (k - 1))));  // Exit Nozzle Area (m^2)
    if (Ae > FuelArea) Ae = FuelArea;
    var VeSub = ((2 * k) / (k - 1)) * ((Ru * Tc) / Mw) * Math.pow(1 - (Pe / Pc), ((k - 1) / k));
    var Ve = Math.sqrt(VeSub);                                                                        // Partical Exit Velocity (m/s)
    return q * Ve + (Pe - Pa) * Ae;                                                                   // Thrust (N)
  }
  function _CoordinateCalculator (CurrentLatitude, CurrentLongitude, TargetLatitude, TargetLongitude) {
    // This function calculates the path of the rocket across the earth in terms of coordinates by using
    // great-circle equations. It will also calculate which direction will be the shortest distance to the
    // target and then calculate the distance across the surface of the earth to the target. There is only
    // one constant for this function and that is the radius of the earth. After finding all the variables
    // for the final and initial points it will the calculate the coordinates along the path by first extending
    // the line between the two points until it reaches the equator. To calculate coordinates along the path it
    // needs the angle the line makes at the equator and also at what longitude the line intersects the equator.
    // The iMathuts for this function are:
    // Phi1:    Latitude coordinate of the starting point
    // Lambda1: Longitude coordinate of the starting point
    // Phi2:    Latitude coordinate of the ending point
    // Lambda2: Longitude coordinate of the ending point
    // The variables that are calculated are:
    // Lambda12:     Angle difference between the starting and ending longitude coordinates
    // Alpha1:       Angle from north the initial point will start its travel at
    // Alpha2:       Angle from north the final point will be traveling at
    // DeltaTheta12: Angle between the two initial and final coordinates
    // ArcLength:    Distance along the earth between the two points
    // Alphao:       Angle off of the great circle line and north when extended back to the equator.
    // DeltaSigma01: Angular distance between the point at the equator and the initial point.
    // DeltaSigma02: Angular distance between the point at the equator and the final point
    // Lambda01:     Longitude difference between the initial point and the point at the equator
    // Lambdao:      Longitude at the point where the great circle intersects the equator
    // Sigma:        Arc distance between the first point and any point along the great circle.
    // Phi:          Latitude at the arbitrary point on the great circle
    // Lambda:       Longitude at the arbitrary point on the great circle
    // This function generates 100 points along the great circle and calculates each longitude and latitude
    // and then stores them in lists. Because these list will be used to plot the great circle path the
    // coordinate will be broken up into multiple lists if the path passes over edge of the map. The last thing
    // the function does before returning the outputs is plotting the great circle onto a map of the globe.
    // The outputs are:
    // The list of latitudes
    // The list of longitudes
    // The angle from north to start the great circle
    // The angular distance between the starting and ending point

    var r = EarthRadius;                               // (m)
    var Phi1 = CurrentLatitude * Math.PI / 180;        // (Rad)
    var Lambda1 = CurrentLongitude * Math.PI / 180;    // (Rad)
    var Phi2 = TargetLatitude * Math.PI / 180;         // (Rad)
    var Lambda2 = TargetLongitude * Math.PI / 180;     // (Rad)
    var Lambda12;

    if (Lambda2 - Lambda1 >= -180 && Lambda2 - Lambda1 <= 180) Lambda12 = Lambda2 - Lambda1;       // (Rad)
    if (Lambda2 - Lambda1 > 180) Lambda12 = (Lambda2 - Lambda1) - 2 * Math.PI;  // (Rad)
    if (Lambda2 - Lambda1 < -180) Lambda12 = (Lambda2 - Lambda1) + 2 * Math.PI; // (Rad)

    var Alpha1 = Math.atan2((Math.sin(Lambda12)), (Math.cos(Phi1) * Math.tan(Phi2) - Math.sin(Phi1) * Math.cos(Lambda12)));     // (Rad)
    // var Alpha2 = Math.atan2((Math.sin(Lambda12)), (-Math.cos(Phi2) * Math.tan(Phi1) + Math.sin(Phi2) * Math.cos(Lambda12)));    // (Rad)
    var DeltaTheta12 = Math.acos((Math.sin(Phi1) * Math.sin(Phi2) + Math.cos(Phi1) * Math.cos(Phi2) * Math.cos(Lambda12)));        // (Rad)
    var ArcLength = DeltaTheta12 * r;                                                                                                // (m)
    var Alphao = Math.asin(Math.sin(Alpha1) * Math.cos(Phi1));                                                                     // (Rad)
    var DeltaSigma01 = Math.atan2((Math.tan(Phi1)), (Math.cos(Alpha1)));                                        // (Rad)
    var DeltaSigma02 = DeltaSigma01 + DeltaTheta12;                                                                                  // (Rad)
    var Lambda01 = Math.atan2((Math.sin(Alphao) * Math.sin(DeltaSigma01)), (Math.cos(DeltaSigma01)));           // (Rad)
    var Lambdao = Lambda1 - Lambda01;                                                                                                // (Rad)
    var EstLatList = [];
    var LatList1 = [];
    var LatList2 = [];
    var LatList3 = [];
    var EstLongList = [];
    var LongList1 = [];
    var LongList2 = [];
    var LongList3 = [];
    var EstDistanceList = [];
    var GoalDistance;
    for (var i = 0; i <= 2400; i++) {
      var Sigma = DeltaSigma01 + (i * (DeltaSigma02 - DeltaSigma01)) / 2000; // (Rad)
      var Phi = (Math.asin(Math.cos(Alphao) * Math.sin(Sigma)) * 180 / Math.PI); // (Degrees)
      var Lambda = (Lambdao + Math.atan2((Math.sin(Alphao) * Math.sin(Sigma)), (Math.cos(Sigma)))) * 180 / Math.PI; // (Degrees)
      if (i === 2000) GoalDistance = ((Sigma - DeltaSigma01) * r);
      EstDistanceList.push(((Sigma - DeltaSigma01) * r) / 1000);
      if (Lambda >= -180 && Lambda <= 180) {
        LongList1.push(Lambda);        // (Degrees)
        LatList1.push(Phi);            // (Degrees)
      } else if (Lambda < -180) {
        LongList3.push(Lambda + 360);  // (Degrees)
        LatList3.push(Phi);            // (Degrees)
      } else if (Lambda > 180) {
        LongList2.push(Lambda - 360);  // (Degrees)
        LatList2.push(Phi);            // (Degrees)
      }
    }

    for (i = 0; i < LatList1.length; i++) EstLatList.push(LatList1[i]);
    for (i = 0; i < LatList2.length; i++) EstLatList.push(LatList2[i]);
    for (i = 0; i < LatList3.length; i++) EstLatList.push(LatList3[i]);
    for (i = 0; i < LongList1.length; i++) EstLongList.push(LongList1[i]);
    for (i = 0; i < LongList2.length; i++) EstLongList.push(LongList2[i]);
    for (i = 0; i < LongList3.length; i++) EstLongList.push(LongList3[i]);

    return [
      EstLatList,
      EstLongList,
      Alpha1 * 180 / Math.PI,
      ArcLength,
      EstDistanceList,
      GoalDistance
    ];
  }
  function _IterationFun (FuelArea, FuelMass, RocketArea, Altitude, RocketCasingMass, NozzleAltitude, drdt, dthetadt, Distance, ArcDistance, MassIn, AngleCoefficient) {
    // This function is the heart of the program. It calculates the simulated flight
    // of the missile. This is only one step of the flight, to get the whole flight
    // simulated it must be iterated in a loop. The iMathuts for the function are:
    // FuelArea:         Area of the fuel surface being burned
    // FuelMass:         Current mass left in the rocket
    // RocketArea:       Cross sectional area of the missile
    // Altitude:         Current altitude of the missile
    // RocketCasingMass: Mass of the casing for the missile
    // NozzleAltitude:   Altitude when the casing stage detaches
    // drdt:             Current velocity in the vertical direction
    // dthetadt:         Current angular velocity around the earth
    // Distance:         Current distance traveled by the missile
    // ArcDistance:      Current distance traveled along the earths surface
    // MassIn:           Current fuel mass entering the rocket (always 0)
    // AngleCoefficient: The coefficient used to govern the missiles trajectory
    // The outputs for this function are:
    // FuelMass:    Mass left in the missile
    // RocketMass:  Total Mass of the missile
    // Tatm:        Atmospheric temperature
    // Patm:        Atmospheric pressure
    // AirDensity:  Density of the atmosphere
    // c:           Current speed of sound of the atmosphere
    // M:           Missiles mach number
    // cD:          Missiles drag Coefficient
    // Thrust:      Thrust produced by the missile
    // DragForce:   Drag force acting upon the missile
    // WeightForce: Gravitational attraction exerted by the earth
    // dr2dt:       Acceleration in the vertical direction
    // drdt:        New velocity in the vertical direction
    // Altitude:    New altitude of the missile
    // Distance:    New distance traveled by the missile
    // ArcVelocity: Velocity of the missile across the surface of the earth
    // ArcDistance: New distance traveled along the earths surface
    // dtheta2dt:   Angular acceleration around the earth
    // dthetadt:    New angular velocity around the earth
    // Some of these values do not need to be returned for calculations in later
    // iterations but are returned anyways to present the data later on in plots
    // in order to understand the flight of the missile and its governing principles

    // This governs the thrust angle as a function of altitude
    var ThrustAngle;
    if (Altitude < 1200000) ThrustAngle = (90 - (AngleCoefficient) * (1.5336118956 + 0.00443173537387 * Altitude - (9.30373890848 * Math.pow(10, -8)) * Math.pow(Altitude, 2) +
                                             (8.37838197732 * Math.pow(10, -13)) * Math.pow(Altitude, 3) - (2.71228576626 * Math.pow(10, -18)) * Math.pow(Altitude, 4))) * 0.0174533; // (Degrees)
    else ThrustAngle = 30;

    // This calculates the angle the drag force acts upon the missile
    var Radius = EarthRadius + Altitude;                            // (m)
    var DragAngle = Math.atan2(drdt, dthetadt);                   // (Degrees)

    // This calculates fuel mass vs time
    if (FuelMass > 0) {
      var MassOut = FuelDensity * FuelArea * BurnRate;              // (kg)
      var dmdt = MassIn - MassOut;                                  // (kg/s)
      FuelMass = FuelMass + dmdt * h;                               // (kg)
    } else {
      FuelMass = 0;
    }

    var RocketMass = FuelMass + RocketCasingMass + WarheadMass;      // (Kg)
    var Tatm = _Temperature(Altitude);                                // (K)
    var Patm = _Pressure(Altitude);                                   // (pa)
    var AirDensity = Patm / (R * Tatm);                              // (kg/m^3)

    // This calculates the drag coeficiant
    var c = Math.pow((1.4 * R * Tatm), (1 / 2));                                     // (m/s)
    var M = (Math.sqrt(Math.pow(drdt, 2) + Math.pow(dthetadt, 2))) / c;                     // (Unitless)
    var cD = _CD(Math.abs(M));                                             // (Unitless)

    // This calculates all the forces acting upon the missile
    var Thrust = 0;
    if (FuelMass > 0) Thrust = _ThrustFun(MassOut, Altitude, FuelArea, NozzleAltitude);    // (N)

    var DragForce = (1 / 2) * AirDensity * (Math.pow(drdt, 2) + Math.pow(dthetadt, 2)) * RocketArea * cD;    // (N)
    var WeightForce = (G * EarthMass * RocketMass) / Math.pow(Radius, 2);                         // (N)

    // Vertical Acceleration and velocity
    var dr2dt = ((Thrust * Math.sin(ThrustAngle) - DragForce * Math.sin(DragAngle) - WeightForce) / RocketMass) + Radius * Math.pow((dthetadt / Radius), 2); // (m/s^2)
    drdt = drdt + dr2dt * h;                         // (m/s)

    Altitude = Altitude + drdt * h;                  // (m)

    Distance = Distance + dthetadt * h;              // (m)

    // Angular distance the missile traveled vs time
    var ArcVelocity = (dthetadt * EarthRadius) / Radius;   // (m/s)
    ArcDistance = ArcDistance + ArcVelocity * h;     // (m)

    // Angular acceleration and velocity
    var dtheta2dt = (((Thrust * Math.cos(ThrustAngle) - DragForce * Math.cos(DragAngle)) / RocketMass) - 2 * drdt * (dthetadt / Radius));  // (m/s^2)
    dthetadt = dthetadt + dtheta2dt * h; // (m/s)

    return [FuelMass, RocketMass, Tatm, Patm, AirDensity, c, M, cD, Thrust, DragForce, WeightForce, dr2dt, drdt, Altitude, Distance, ArcVelocity, ArcDistance, dtheta2dt, dthetadt];
  }
  function _Bisection (FuelArea1, FuelArea2, FuelMass, FuelVolume, RocketArea, Altitude, RocketCasingMass1, RocketCasingMass2, RocketCasingMass3, NozzleAltitude1, drdt, dthetadt, Distance, ArcDistance, MassIn, ArcLength, GoalDistance) {
    // This function is designed to calculate the needed angle coefficient to for the trust
    // to govern the missiles path into its designated target. Because this missile has the
    // capability of entering into orbit, more complicated calculations needed to be used to
    // ensure that the program would be successful in finding the correct drag coefficient
    // in all instances. How the function works is by running the missile simulation multiple
    // times with different angle coefficients to find with one lands the missile closest to
    // its target. Once it has a ball park region for the angle coefficient it runs a modified
    // bisection method to further bring the angle coefficient closer to the needed value to
    // land the missile on the target. The inputs for the program are:
    // FuelArea1:         Area of the fuel surface being burned for the first and second stages of the missile
    // FuelArea2:         Area of the fuel surface being burned for the third stage of the missile
    // FuelMass:          Mass left in the missile
    // FuelVolume:        Initial value of the total volume of fuel stored in the missile
    // RocketArea:        Cross sectional area of the missile
    // Altitude:          Initial condition for the altitude (0 meters)
    // RocketCasingMass1: Mass of the casing for the missiles during the first stage
    // RocketCasingMass2: Mass of the casing for the missiles during the second stage
    // RocketCasingMass3: Mass of the casing for the missiles during the third stage
    // NozzleAltitude1:   The altitude used to calculate the nozzle for the first stage (0 meters)
    // drdt:              Initial condition for the velocity in the vertical direction (0 m/s)
    // dthetadt:          Initial condition for the angular velocity around the earth (0 m/s)
    // Distance:          Initial condition for the distance traveled by the missile (0 meters)
    // ArcDistance:       Initial condition for the distance traveled along the earths surface (0 meters)
    // MassIn:            Initial condition for the mass entering the missile (always 0)
    // ArcLength:         Distance from the starting point to the target along the surface of the earth
    // The functions output it:
    // AngleCoefficient:  The angle coefficient which directs the missile directly to it's target

    var DistanceSteps = [];
    var Steps = 500;
    for (var i = 0; i < Steps; i++) {
      var AngleCoefficient = (i * 1) / Steps / 2 + 0.5;
      DistanceSteps.push(_QuickRun(FuelArea1, FuelArea2, FuelMass, FuelVolume, RocketArea,
                  Altitude, RocketCasingMass1, RocketCasingMass2, RocketCasingMass3,
                  NozzleAltitude1, drdt, dthetadt, Distance, ArcDistance, MassIn, AngleCoefficient
                ));
    }
    var DistanceClosest = DistanceSteps[0];
    var oldDistanceClosest = Math.abs(DistanceSteps[0] - GoalDistance);
    for (i = 0; i < DistanceSteps.length; i++) {
      var newDistanceClosest = Math.abs(DistanceSteps[i] - GoalDistance);
      if (newDistanceClosest < oldDistanceClosest) {
        oldDistanceClosest = newDistanceClosest;
        DistanceClosest = DistanceSteps[i];
      }
    }
    for (i = 0; i < Steps; i++) {
      if (DistanceSteps[i] === DistanceClosest) {
        var DistanceClosePossition = i;
        break;
      }
    }
    AngleCoefficient = (DistanceClosePossition * 1) / Steps / 2 + 0.5;

    // bisection method
    AC1 = (DistanceClosePossition - 2) / Steps / 2 + 0.5;
    AC2 = (DistanceClosePossition + 2) / Steps / 2 + 0.5;
    ACNew = (AC1 + AC2) / 2;
    var qRunACNew = _QuickRun(FuelArea1, FuelArea2, FuelMass, FuelVolume, RocketArea,
                                      Altitude, RocketCasingMass1, RocketCasingMass2, RocketCasingMass3,
                                      NozzleAltitude1, drdt, dthetadt, Distance, ArcDistance, MassIn, ACNew);
    var error = Math.abs((GoalDistance - qRunACNew) / GoalDistance) * 100;
    while (error > 0.01 && Math.abs(AC2 - AC1) >= 0.0001) {
      var ACNew = (AC1 + AC2) / 2;
      error = Math.abs((GoalDistance - _QuickRun(
                                      FuelArea1, FuelArea2, FuelMass, FuelVolume, RocketArea,
                                      Altitude, RocketCasingMass1, RocketCasingMass2, RocketCasingMass3,
                                      NozzleAltitude1, drdt, dthetadt, Distance, ArcDistance, MassIn, ACNew)
                                    ) / GoalDistance) * 100;
      if (_QuickRun(FuelArea1, FuelArea2, FuelMass, FuelVolume, RocketArea,
                  Altitude, RocketCasingMass1, RocketCasingMass2, RocketCasingMass3,
                  NozzleAltitude1, drdt, dthetadt, Distance, ArcDistance, MassIn, ACNew
                ) > GoalDistance) {
        var AC2 = ACNew;
      } else {
        var AC1 = ACNew;
      }
    }
    AngleCoefficient = ACNew;
    return AngleCoefficient;
  }
  function _QuickRun (FuelArea1, FuelArea2, FuelMass, FuelVolume, RocketArea, Altitude, RocketCasingMass1, RocketCasingMass2, RocketCasingMass3, NozzleAltitude1, drdt, dthetadt, Distance, ArcDistance, MassIn, AngleCoefficient) {
    // This function calculates the entire simularion of the missiles tragectory without
    // collecting any information along the way. It's purpose is for the angle cooefficeint
    // optimizer to have a quick way to run the simulation and retreive the final distance
    // the missile traveled along the surface of the earth. The functions inputs are:
    // FuelArea1:         Area of the fuel surface being burned for the first and second stages of the missile
    // FuelArea2:         Area of the fuel surface being burned for the third stage of the missile
    // FuelMass:          Mass left in the missile
    // FuelVolume:        Initial value of the total volume of fuel stored in the missile
    // RocketArea:        Cross sectional area of the missile
    // Altitude:          Initial condition for the altitude (0 meters)
    // RocketCasingMass1: Mass of the casing for the missiles during the first stage
    // RocketCasingMass2: Mass of the casing for the missiles during the second stage
    // RocketCasingMass3: Mass of the casing for the missiles during the third stage
    // NozzleAltitude1:   The altitude used to calculate the nozzle for the first stage (0 meters)
    // drdt:              Initial condition for the velocity in the vertical direction (0 m/s)
    // dthetadt:          Initial condition for the angular velocity around the earth (0 m/s)
    // Distance:          Initial condition for the distance traveled by the missile (0 meters)
    // ArcDistance:       Initial condition for the distance traveled along the earths surface (0 meters)
    // MassIn:            Initial condition for the mass entering the missile (always 0)
    // AngleCoefficient:  Coefficient used to govern the angle of the thrust to dirrect the missile towards its target
    // The output for this function is:
    // ArcDistance:       The total distance traveled by the missile along the surface of the earth
    // var RocketMass, Tatm, Patm, AirDensity, c, M, cD, Thrust, DragForce, WeightForce, dr2dt, ArcVelocity, theta2dt;
    var NozzleAltitude2, NozzleAltitude3, dtheta2dt, ArcVelocity, dr2dt, WeightForce, DragForce, Thrust, cD, M, c, AirDensity, Patm, Tatm, RocketMass, FuelMass;
    var iterationFunOutput = [];
    var MaxAltitude = [];

    while ((FuelMass / FuelDensity) / FuelVolume > 0.4 && Altitude >= 0) {
      iterationFunOutput = _IterationFun(FuelArea1, FuelMass, RocketArea, Altitude, RocketCasingMass1, NozzleAltitude1, drdt, dthetadt, Distance, ArcDistance, MassIn, AngleCoefficient);
      FuelMass = iterationFunOutput[0];
      RocketMass = iterationFunOutput[1];
      Tatm = iterationFunOutput[2];
      Patm = iterationFunOutput[3];
      AirDensity = iterationFunOutput[4];
      c = iterationFunOutput[5];
      M = iterationFunOutput[6];
      cD = iterationFunOutput[7];
      Thrust = iterationFunOutput[8];
      DragForce = iterationFunOutput[9];
      WeightForce = iterationFunOutput[10];
      dr2dt = iterationFunOutput[11];
      drdt = iterationFunOutput[12];
      Altitude = iterationFunOutput[13];
      MaxAltitude.push(Altitude);
      Distance = iterationFunOutput[14];
      ArcVelocity = iterationFunOutput[15];
      ArcDistance = iterationFunOutput[16];
      dtheta2dt = iterationFunOutput[17];
      dthetadt = iterationFunOutput[18];
      NozzleAltitude2 = Altitude;
    }
    while ((FuelMass / FuelDensity) / FuelVolume > 0.19 && Altitude >= 0) {
      iterationFunOutput = _IterationFun(FuelArea1, FuelMass, RocketArea, Altitude, RocketCasingMass2, NozzleAltitude2, drdt, dthetadt, Distance, ArcDistance, MassIn, AngleCoefficient);
      FuelMass = iterationFunOutput[0];
      RocketMass = iterationFunOutput[1];
      Tatm = iterationFunOutput[2];
      Patm = iterationFunOutput[3];
      AirDensity = iterationFunOutput[4];
      c = iterationFunOutput[5];
      M = iterationFunOutput[6];
      cD = iterationFunOutput[7];
      Thrust = iterationFunOutput[8];
      DragForce = iterationFunOutput[9];
      WeightForce = iterationFunOutput[10];
      dr2dt = iterationFunOutput[11];
      drdt = iterationFunOutput[12];
      Altitude = iterationFunOutput[13];
      MaxAltitude.push(Altitude);
      Distance = iterationFunOutput[14];
      ArcVelocity = iterationFunOutput[15];
      ArcDistance = iterationFunOutput[16];
      dtheta2dt = iterationFunOutput[17];
      dthetadt = iterationFunOutput[18];
      NozzleAltitude3 = Altitude;
    }
    while ((FuelMass / FuelDensity) / FuelVolume > 0 && Altitude >= 0) {
      iterationFunOutput = _IterationFun(FuelArea2, FuelMass, RocketArea, Altitude, RocketCasingMass3, NozzleAltitude3, drdt, dthetadt, Distance, ArcDistance, MassIn, AngleCoefficient);
      FuelMass = iterationFunOutput[0];
      RocketMass = iterationFunOutput[1];
      Tatm = iterationFunOutput[2];
      Patm = iterationFunOutput[3];
      AirDensity = iterationFunOutput[4];
      c = iterationFunOutput[5];
      M = iterationFunOutput[6];
      cD = iterationFunOutput[7];
      Thrust = iterationFunOutput[8];
      DragForce = iterationFunOutput[9];
      WeightForce = iterationFunOutput[10];
      dr2dt = iterationFunOutput[11];
      drdt = iterationFunOutput[12];
      Altitude = iterationFunOutput[13];
      MaxAltitude.push(Altitude);
      Distance = iterationFunOutput[14];
      ArcVelocity = iterationFunOutput[15];
      ArcDistance = iterationFunOutput[16];
      dtheta2dt = iterationFunOutput[17];
      dthetadt = iterationFunOutput[18];
    }
    while (Altitude > 0) {
      FuelMass = 0;
      iterationFunOutput = _IterationFun(FuelArea2, FuelMass, RocketArea, Altitude, RocketCasingMass3, NozzleAltitude3, drdt, dthetadt, Distance, ArcDistance, MassIn, AngleCoefficient);
      FuelMass = iterationFunOutput[0];
      RocketMass = iterationFunOutput[1];
      Tatm = iterationFunOutput[2];
      Patm = iterationFunOutput[3];
      AirDensity = iterationFunOutput[4];
      c = iterationFunOutput[5];
      M = iterationFunOutput[6];
      cD = iterationFunOutput[7];
      Thrust = iterationFunOutput[8];
      DragForce = iterationFunOutput[9];
      WeightForce = iterationFunOutput[10];
      dr2dt = iterationFunOutput[11];
      drdt = iterationFunOutput[12];
      Altitude = iterationFunOutput[13];
      MaxAltitude.push(Altitude);
      Distance = iterationFunOutput[14];
      ArcVelocity = iterationFunOutput[15];
      ArcDistance = iterationFunOutput[16];
      dtheta2dt = iterationFunOutput[17];
      dthetadt = iterationFunOutput[18];
    }

    var MaxAltitudeMax = 0;
    for (var i = 0; i < MaxAltitude.length; i++) {
      if (MaxAltitude[i] > MaxAltitudeMax) MaxAltitudeMax = MaxAltitude[i];
    }

    // console.log('Ac: ' + (1 - AngleCoefficient).toFixed(3) + ' - Max Alt: ' + (MaxAltitudeMax / 1000).toFixed(0) + ' - Dist: ' + ArcDistance / 1000);

    return Distance;
  }
  function _clearMissiles () {
    $('#search').val('');
    missileManager.missilesInUse = 0;
    searchBox.hideResults();
    var satSetLen = satSet.getSatData().length;
    for (var i = 0; i < 500; i++) {
      var x = satSetLen - 500 + i;
      // satSet.setSat(x, missileArray[i]);
      var MissileObject = satSet.getSat(x);
      MissileObject.active = false;

      satCruncher.postMessage({
        id: MissileObject.id,
        typ: 'newMissile',
        ON: 'RV_' + MissileObject.name,
        satId: MissileObject.id,
        static: MissileObject.static,
        missile: MissileObject.missile,
        active: MissileObject.active,
        type: MissileObject.type,
        name: MissileObject.name,
        latList: MissileObject.latList,
        lonList: MissileObject.lonList,
        altList: MissileObject.altList,
        startTime: MissileObject.startTime
      });
    }
  }
})();
