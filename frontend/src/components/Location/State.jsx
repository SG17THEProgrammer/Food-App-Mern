import React, { useEffect, useState } from 'react';
import City from './City';

const stateArr = [
  "Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand",
  "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal"
];


const s_a = [
  "" , 
  " Alipur | Andaman Island | Anderson Island | Arainj-Laka-Punga | Austinabad | Bamboo Flat | Barren Island | Beadonabad | Betapur | Bindraban | Bonington | Brookesabad | Cadell Point | Calicut | Chetamale | Cinque Islands | Defence Island | Digilpur | Dolyganj | Flat Island | Geinyale | Great Coco Island | Haddo | Havelock Island | Henry Lawrence Island | Herbertabad | Hobdaypur | Ilichar | Ingoie | Interview Island | Jangli Ghat | Jhon Lawrence Island | Karen | Kartara | KYD Island | Landfall Island | Little Andaman | Little Coco Island | Long Island | Maimyo | Malappuram | Manglutan | Manpur | Mitha Khari | Neill Island | Nicobar Island | North Brother Island | North Passage Island | North Sentinel Island | Northern Reef Island | Outram Island | Pahlagaon | Palalankwe | Passage Island | Phaiapong | Phoenix Island | Port Blair | Preparis Island | Protheroepur | Rangachang | Rongat | Rutland Island | Sabari | Saddle Peak | Shadipur | Smith Island | Sound Island | South Sentinel Island | Spike Island | Tarmugli Island | Taylerabad | Titaije | Toibalawe | Tusonabad | West Island | Wimberleyganj | Yadita",

  " Adoni | Amaravati | Anantapur | Bhimavaram | Chittoor | Eluru | Guntur | Kadapa | Kakinada | Kurnool | Machilipatnam | Mangalagiri | Nellore | Ongole | Proddatur | Rajahmundry | Srikakulam | Tadipatri | Tirupati | Vijayawada | Visakhapatnam | Vizianagaram | Tenali | Nandyal | Hindupur | Madanapalle | Puttaparthi | Tadepalligudem | Narasaraopet | Guntakal | Chittoor | Punganur | Tanuku | Bapatla | Anakapalle | Samalkot | Piduguralla | Chilakaluripet | Markapur | Nandikotkur | Kandukur | Sullurpeta | Palakollu | Parvathipuram | Jaggayyapeta | Dharmavaram | Kalyandurg | Mandapeta | Rayachoti | Nidadavole | Rajampet | Kovvur | Vinukonda | Adoni | Amalapuram | Atmakur | Bobbili | Gudivada | Kothapeta | Markapur | Nagari | Palasa | Rayadurg | Salur | Tuni | Yemmiganur | Ponnur",


  " Itanagar | Tawang | Ziro | Bomdila | Pasighat | Along | Tezu | Naharlagun | Roing | Khonsa | Seppa | Namsai | Daporijo | Changlang | Yingkiong | Anini | Palin | Koloriang | Hawai | Mechuka | Miao | Jairampur | Raga | Longding | Pangin | Yupia | Basar | Tuting | Balijan | Bordumsa | Lumla | Dirang | Boleng | Nacho | Margherita | Geku | Jang | Liromoba | Menchukha | Vijoynagar",


  " Guwahati | Silchar | Dibrugarh | Jorhat | Nagaon | Tinsukia | Tezpur | Bongaigaon | Karimganj | Diphu | Goalpara | Golaghat | Sivasagar | Dhubri | North Lakhimpur | Haflong | Barpeta | Kokrajhar | Lakhimpur | Dhekiajuli | Nalbari | Morigaon | Bihpuria | Hojai | Mangaldoi | Margherita | Udalguri | Rangia | Lumding | Biswanath Chariali | Bokajan | Sonari | Titabar | Chabua | Tihu | Sarupathar | Silapathar | Naharkatia | Sualkuchi | Gohpur | Pathsala | Hailakandi | Dergaon | Jorhat | Numaligarh | Duliajan | Digboi | Raha | Mariani | Doom Dooma | Belsor | Gauripur | Majuli | Hojai",


  " Patna | Gaya | Bhagalpur | Muzaffarpur | Darbhanga | Purnia | Bihar Sharif | Arrah | Begusarai | Katihar | Munger | Chhapra | Bettiah | Saharsa | Sasaram | Hajipur | Dehri | Siwan | Motihari | Nawada | Bagaha | Buxar | Kishanganj | Sitamarhi | Jamalpur | Jehanabad | Aurangabad | Lakhisarai | Madhepura | Samastipur | Murliganj | Sheikhpura | Araria | Forbesganj | Khagaria | Naugachhia | Rajgir | Sheohar | Gopalganj | Madhubani | Supaul | Piro | Raxaul | Phulwari Sharif | Jhajha | Banmankhi | Mahnar Bazar | Barh | Bihta | Maner | Jamui | Bhabua | Benipur | Dhaka | Sasaram | Nawada | Sugauli | Fatuha | Bakhtiarpur | Sitamarhi | Lalganj | Danapur | Dalsinghsarai | Rusera | Mokama | Narkatiaganj | Jagdispur | Bikramganj | Rajpur | Marhaura | Warisaliganj | Rosera | Lalganj",




  " Chandigarh | Mani Marja",


  " Raipur | Bilaspur | Bhilai | Korba | Durg | Rajnandgaon | Jagdalpur | Raigarh | Ambikapur | Dhamtari | Mahasamund | Chirmiri | Bhatapara | Raipur | Bilaspur | Bhilai | Korba | Durg | Rajnandgaon | Jagdalpur | Raigarh | Ambikapur | Dhamtari | Mahasamund | Chirmiri | Bhatapara | Kawardha | Manendragarh | Naila-Janjgir | Surajpur | Tilda Newra | Balod | Dalli-Rajhara | Baloda Bazar | Khairagarh | Mungeli | Bemetara | Kondagaon | Dongargarh | Sarangarh | Pandariya | Gharghoda",




  " Silvassa | Amli | Samarvarni | Naroli | Randha | Rakholi | Dapada | Galonda | Khanvel | Dudhani",


  " Daman | Diu | Dunetha | Bhimpore | Marwad | Varkund | Kadaiya | Bhenslore",



  " New Delhi | Delhi | Connaught Place | Karol Bagh | Chandni Chowk | Greater Kailash | Vasant Vihar | South Extension | Lajpat Nagar | Dwarka | Rohini | Pitampura | Shahdara | Janakpuri | Saket | Hauz Khas | Green Park | Rajouri Garden | Mayur Vihar | Preet Vihar | Laxmi Nagar | Patel Nagar | R.K. Puram | Uttam Nagar | Najafgarh | Naraina | Moti Nagar | Model Town | Mukherjee Nagar | Kamla Nagar | Ashok Vihar | Adarsh Nagar | Shalimar Bagh | Civil Lines | Punjabi Bagh | Kirti Nagar | Tilak Nagar | Nangloi | Jahangirpuri | Mehrauli | Badarpur | Okhla | Kalkaji | Jasola | Bhikaji Cama Place | Sarojini Nagar | Malviya Nagar | Palam | Karampura | Chittaranjan Park | Safdarjung Enclave | Chanakyapuri | Rajendra Nagar | Dwarka | Rohini | Pitampura | Shahdara | Janakpuri | Saket | Hauz Khas | Green Park | Rajouri Garden | Mayur Vihar | Preet Vihar | Laxmi Nagar | Patel Nagar | R.K. Puram | Uttam Nagar | Najafgarh | Naraina | Moti Nagar | Model Town | Mukherjee Nagar | Kamla Nagar | Ashok Vihar | Adarsh Nagar | Shalimar Bagh | Civil Lines | Punjabi Bagh | Kirti Nagar | Tilak Nagar | Nangloi | Jahangirpuri | Mehrauli | Badarpur | Okhla | Kalkaji | Jasola | Bhikaji Cama Place | Sarojini Nagar | Malviya Nagar | Palam | Karampura | Chittaranjan Park | Safdarjung Enclave | Chanakyapuri | Rajendra Nagar",


  " Panaji | Margao | Vasco da Gama | Mapusa | Ponda | Bicholim | Cuncolim | Curchorem | Pernem | Sanquelim | Valpoi | Canacona | Quepem | Sanguem",



  " Ahmedabad | Surat | Vadodara | Rajkot | Bhavnagar | Jamnagar | Junagadh | Gandhinagar | Anand | Navsari | Morbi | Bharuch | Vapi | Surendranagar | Mehsana | Bhuj | Patan | Porbandar | Nadiad | Gandhidham | Veraval | Botad | Amreli | Palanpur | Dahod | Godhra | Himmatnagar | Dwarka | Modasa | Lunawada | Mandvi | Halol | Khambhat | Unjha | Kalol | Valsad | Sanand | Deesa | Umreth",





  " Faridabad | Gurgaon | Panipat | Ambala | Yamunanagar | Rohtak | Hisar | Karnal | Sonipat | Panchkula | Bhiwani | Sirsa | Bahadurgarh | Jind | Thanesar | Kaithal | Rewari | Palwal | Gohana | Fatehabad | Sohna | Narnaul | Hansi | Narwana | Tohana | Kalka | Taraori | Pinjore | Samalkha | Shahbad | Ratia | Jhajjar | Charkhi Dadri | Meham | Safidon | Mahendragarh | Pundri | Ganaur | Beri | Pataudi | Kanina",


  " Shimla | Dharamshala | Mandi | Solan | Nahan | Kullu | Chamba | Hamirpur | Bilaspur | Una | Palampur | Sundernagar | Kangra | Parwanoo | Dalhousie | Kasauli | Keylong | Kalpa | Manali | Rampur | Rohru | Nalagarh",



  " Srinagar | Jammu | Anantnag | Baramulla | Sopore | Udhampur | Kathua | Rajouri | Poonch | Pulwama | Kulgam | Bandipora | Leh | Kargil | Doda | Kupwara | Samba | Reasi | Budgam | Ramban | Shopian | Ganderbal | Handwara | Awantipora | Bari Brahmana | Batote | Bijbehara | Gulmarg | Qazigund | Ramban | Zanskar",



  " Ranchi | Dhanbad | Jamshedpur | Bokaro Steel City | Deoghar | Hazaribagh | Giridih | Ramgarh | Medininagar | Phusro | Chirkunda | Jhumri Telaiya | Chaibasa | Chatra | Chas | Gumla | Lohardaga | Godda | Sahibganj | Pakaur | Khunti | Simdega | Latehar | Bishrampur | Ghatshila | Mihijam | Dumka | Garhwa | Hussainabad | Tandwa | Tenu Dam-cum-Kathhara | Jharia | Patratu | Adityapur | Seraikela",



  " Bangalore | Mysore | Hubli-Dharwad | Mangalore | Belgaum | Davangere | Bellary | Bijapur | Shimoga | Tumkur | Raichur | Bidar | Hospet | Gadag | Robertsonpet | Hassan | Bhadravati | Chitradurga | Kolar | Mandya | Udupi | Chikmagalur | Bagalkot | Ranebennur | Gangavati | Dandeli | Bhalki | Gokak | Sirsi | Sindhnur | Athni | Tekkalakote | Mudhol | Mulbagal | Gadag-Betigeri | Kushalanagar | Maddur | Sagar | Puttur | Yadgir | Shiggaon | Siruguppa | Ron | Shahabad | Rabkavi Banhatti | Lakshmeshwar | Kampli | Ilkal | Guledgudda | Channarayapatna | Challakere | Basavakalyan | Sindhagi | Savanur | Mundargi | Madikeri | Lingsugur | Kowdle | Koppal | Kolar Gold Fields | Kittur | Karkala | Kanakapura | Kamlapuram | Kadur | Hubli | Hirekerur | Haliyal | Hagaribommanahalli | Gubbi | Gurmatkal | Gowribidanur | Gokarna | Gonikoppal | Gauribidanur | Gubbi | Channapatna | Birur | Belthangady | Belluru | Ballari | Badami",





  " Thiruvananthapuram | Kochi | Kozhikode | Kollam | Thrissur | Alappuzha | Palakkad | Malappuram | Ponnani | Kanhangad | Kasaragod | Kottayam | Kannur | Neyyattinkara | Nedumangad | Varkala | Pathanamthitta | Muvattupuzha | Kodungallur | Kothamangalam | Chengannur | Chalakudy | Koyilandy | Tirur | Perumbavoor | Punalur | Thalassery | Paravoor | Payyannur | Kunnamkulam | Ottapalam | Shoranur | Mannarkkad | Aluva | Changanassery | Guruvayoor | Tirurangadi | Kayamkulam | Kattappana | Manjeri | Taliparamba | Adoor | Koduvally | Kottarakkara | Chittur-Thathamangalam | Mavelikkara | Kalpetta | Puthuppally | Pala | Ranni | Pathanapuram | Thiruvalla | Irinjalakuda | Piravom | Vatakara | Pandalam | Pathiriyad | Nilambur | Mattannur | Malur | Mattancherry",




  " Kavaratti | Agatti | Minicoy | Amini | Kadmat | Andrott | Kalpeni | Chetlat | Bitra | Kiltan | Bangaram | Suheli | Cheriyapani | Tilakkam",




  " Bhopal | Indore | Gwalior | Jabalpur | Ujjain | Sagar | Dewas | Satna | Ratlam | Rewa | Murwara | Singrauli | Burhanpur | Khandwa | Bhind | Shivpuri | Vidisha | Chhindwara | Guna | Seoni | Chhatarpur | Damoh | Mandsaur | Neemuch | Morena | Betul | Hoshangabad | Katni | Narsinghpur | Shahdol | Sehore | Datia | Nagda | Pithampur | Itarsi | Dabra | Maihar | Manasa | Harda | Narmadapuram | Shujalpur | Mandideep | Shajapur | Biaora | Ashoknagar | Sendhwa | Multai | Tikamgarh | Raghogarh-Vijaypur | Sarangpur | Barwani | Sheopur | Rajgarh | Balaghat | Khargone | Burhanpur | Raisen | Dindori | Anuppur | Umaria | Badwani | Mandla | Dhar | Jhabua | Alirajpur | Niwari",





  " Mumbai | Pune | Nagpur | Nashik | Thane | Aurangabad | Solapur | Pimpri-Chinchwad | Amravati | Kolhapur | Akola | Jalgaon | Latur | Nanded | Ahmednagar | Chandrapur | Parbhani | Sangli | Jalna | Bhiwandi | Malegaon | Panvel | Beed | Ratnagiri | Satara | Wardha | Gondia | Ulhasnagar | Bhusawal | Ahmednagar | Osmanabad | Nandurbar | Yavatmal | Dhule | Ichalkaranji | Ambarnath | Udgir | Sangamner | Jalgaon | Bhadravati | Baramati | Deolali | Navi Mumbai | Kalyan-Dombivli | Mira-Bhayandar | Vasai-Virar | Ambarnath | Badlapur | Bhiwandi-Nizampur | Chandrapur | Chalisgaon | Dhule | Jalgaon | Jalna | Kolhapur | Latur | Nagpur | Nashik | Pimpri-Chinchwad | Pune | Sangli-Miraj & Kupwad | Satara | Solapur | Ulhasnagar",




  " Imphal | Thoubal | Kakching | Bishnupur | Churachandpur | Ukhrul | Senapati | Tamenglong | Moreh | Moirang | Jiribam | Lilong | Mayang Imphal | Wangjing | Yairipok | Nambol | Sugnu | Sekmai | Andro | Khongjom | Samurou | Kwakta | Ningthoukhong | Heirok | Kumbi | Oinam | Kangpokpi | Wangoi | Thongkhong Laxmi Bazar | Lamlai | Wangbal | Leimakhong | Lamjaotongba | Yairipok | Leimakhong | Lamsang | Mayang Imphal | Moirang | Nambol | Ningthoukhong | Oinam | Samurou | Sekmai | Sugnu | Thongkhong Laxmi Bazar | Wangbal | Wangjing | Wangoi | Yairipok",



  " Shillong | Tura | Jowai | Nongpoh | Mairang | Williamnagar | Nongstoin | Resubelpara | Baghmara | Cherrapunjee | Mawkyrwat | Ampati | Khliehriat | Mendi Pathar | Mawsynram | Umroi | Mawphlang | Sohra | Pynursla | Patharkhmah | Jirang | Mawshynrut | Mawphlang | Rongram | Amlarem | Dawki | Langrin | Nartiang | Mawryngkneng | Mylliem | Tikrikilla | Ranikor | Nongkhlaw | Pynursla | Mairang | Mawlai | Laskein | Songsak | Kharkutta | Chokpot | Rongjeng | Bajengdoba | Mawhati | Rongara",


  " Aizawl | Lunglei | Saiha | Champhai | Serchhip | Kolasib | Mamit | Lawngtlai | Hnahthial | Saitual | Khawzawl | Bairabi | Thenzawl | Tlabung | Vairengte | Zawlnuam | Darlawn | Sairang | Hnahlan | Kawnpui | N. Kawnpui | N. Vanlaiphai | Khawhai | Khawbung | Khawzawl | Kawnpui | Kolasib | Lawngtlai | Lengpui | Lunglei | Mamit | Marpara | Melriat | N. Thingdawl | N. Vanlaiphai | N. Vengpui | Pangzawl | Phullen | R. Vanlaiphai | Reiek | S. Chawngtui | Saitual | Sairang | Serchhip | Sihphir | Sialsuk | Tlabung | Tuichangral | W. Lungdar | Zawlnuam",



  " Kohima | Dimapur | Mokokchung | Tuensang | Mon | Wokha | Zunheboto | Kiphire | Longleng | Peren | Phek | Tseminyu | Chumukedima | Jalukie | Medziphema | Pfutsero | Chozuba | Noklak | Meluri | Bhandari | Sanis | Tuli | Tizit | Changtongya | Naginimora | Pughoboto | Aboi | Tobu | Longkhim | Angangba | Akuluto | Chuchuyimlang | Shamatore | Mangkolemba | Tamlu | Chessore | Panso | Satakha | Seyochung | Wokha | Ralan | Wakching | Thonoknyu | Tizit | Tuli | Zunheboto | Peren | Mokokchung | Dimapur | Kohima",



  " Bhubaneswar | Cuttack | Rourkela | Berhampur | Sambalpur | Puri | Balasore | Baripada | Bhadrak | Jharsuguda | Jeypore | Paradip | Bargarh | Kendujhar | Bhawanipatna | Balangir | Talcher | Dhenkanal | Angul | Nayagarh | Koraput | Malkangiri | Rayagada | Jajpur | Soro | Phulbani | Titilagarh | Sunabeda | Bhanjanagar | Gunupur | Khordha | Chatrapur | Kandhamal | Jagatsinghpur | Kendrapara | Subarnapur | Athagarh | Boudh | Birmaharajpur | Brajarajnagar | Buguda | Digapahandi | Jaleswar | Kamakhyanagar | Kantabanji | Karanjia | Kabisuryanagar | Malkangiri | Nabarangpur | Nilgiri | Padampur | Parlakhemundi | Patnagarh | Phulbani | Rajgangpur | Rairangpur | Rairakhol | Rajpur | Remuna | Soro | Sunabeda | Sundargarh | Sonepur | Tarbha | Umarkote | Chatrapur | Chandabali | Chikiti | Daringbadi | Dhamanagar | Dhenkanal | Digapahandi | Gobindpur | Gunupur | Hirakud | Jagatsinghpur | Jaleswar | Joda | Khandapada | Karanjia | Kesinga | Khariar | Khordha | Lanjigarh | Mukhiguda | Muniguda | Nabarangpur | Nimapada | Nuapada | Pallahara | Puri | Rajgangpur | Rayagada | Rengali | Rourkela | Talcher | Umerkote",



  " Bahur | Karaikal | Mahe | Pondicherry | Purnankuppam | Valudavur | Villianur | Yanam",



  " Ludhiana | Amritsar | Jalandhar | Patiala | Bathinda | Hoshiarpur | Mohali | Batala | Pathankot | Moga | Abohar | Malerkotla | Khanna | Phagwara | Muktsar | Barnala | Rajpura | Firozpur | Kapurthala | Faridkot | Sunam | Sangrur | Tarn Taran | Mansa | Sirhind-Fatehgarh Sahib | Nabha | Gurdaspur | Gobindgarh | Malout | Zira | Ahmedgarh | Jagraon | Nakodar | Budhlada | Dhuri | Samana | Ropar | Longowal | Dera Bassi | Rampura Phul | Raikot | Payal | Talwara | Bhawanigarh | Bhikhi | Moonak | Lehragaga | Dirba | Machhiwara | Banur | Mullanpur Dakha | Firozpur Cantt | Kot Kapura | Jaitu | Jandiala | Patti | Jalalabad | Bholath | Nihal Singhwala | Bilga | Nawanshahr | Begowal | Qadian | Dhilwan | Doraha | Bagha Purana | Bhulath | Sham Chaurasi | Ajitgarh | Amloh | Ananadpur Sahib | Bariwala | Bhadson | Bhogpur | Budhlada | Chak Suhelewala | Chohla Sahib | Dasua | Dhariwal | Dina Nagar | Fatehgarh Churian | Fatehgarh Panjtur | Gidderbaha | Goniana | Hariana | Jagraon | Jaitu | Jalalabad | Jandiala Guru | Jhunir | Kalanaur | Khamanon | Kot Ise Khan | Lohian Khas | Majitha | Makhu | Mallanwala | Mehna | Moga | Morinda | Mukerian | Nakodar | Narot Jaimal Singh | Nabha | Nangal | Nurmahal | Pathankot | Patiala | Patti | Phagwara | Phillaur | Raikot | Rampura Phul | Rayya | Ropar | Rupnagar | Samana | Sham Chaurasi | Shahkot | Sri Hargobindpur | Talwandi Sabo | Talwara | Tapa | Taran Taran | Thikriwala | Tibba | Zira",



  " Jaipur | Jodhpur | Kota | Bikaner | Ajmer | Udaipur | Bhilwara | Alwar | Bharatpur | Pali | Sikar | Banswara | Baran | Barmer | Beawar | Bhilwara | Bikaner | Bundi | Chittorgarh | Churu | Dausa | Dholpur | Dungarpur | Hanumangarh | Hindaun | Jaisalmer | Jhalawar | Jhunjhunu | Jodhpur | Karauli | Kishangarh | Kota | Nagaur | Nawalgarh | Pali | Rajsamand | Sawai Madhopur | Sikar | Sirohi | Sri Ganganagar | Sujangarh | Tonk | Udaipur",



  " Gangtok | Namchi | Geyzing | Mangan | Singtam | Rangpo | Jorethang | Pakyong | Soreng | Yuksom | Lachung | Lachen | Ravangla | Chungthang | Dentam | Rhenock | Melli | Legship | Rorathang | Dikchu | Singithang | Temi | Kabi | Kewzing | Chubakha | Hee-Bermiok | Darap | Uttarey | Yuksom | Tashiding | Rinchenpong | Soreng | Namchi | Geyzing | Mangan | Gangtok | Rabong | Yangang",



  " Chennai | Coimbatore | Madurai | Tiruchirappalli | Salem | Tirunelveli | Vellore | Erode | Thanjavur | Tuticorin | Dindigul | Thoothukudi | Karur | Kanchipuram | Kumbakonam | Tiruvannamalai | Nagercoil | Hosur | Cuddalore | Kancheepuram | Karaikudi | Neyveli | Sivakasi | Udhagamandalam | Pollachi | Rajapalayam | Pudukottai | Ambattur | Avadi | Tiruppur | Tiruchengode | Tiruvottiyur | Perambalur | Dharapuram | Tiruvallur | Tirupathur | Tiruttani | Tiruvannamalai | Tindivanam | Uthiramerur | Vadipatti | Vaniyambadi | Velankanni | Villupuram | Virudhunagar | Walajapet | Arakkonam | Chidambaram | Arani | Attur | Gobichettipalayam | Gudiyatham | Kallakurichi | Kavindapadi | Manamadurai | Mannargudi | Nagapattinam | Namakkal | Nellikuppam | Nandivaram-Guduvancheri | Narasingapuram | Natham | Neyveli | O' Valley | P. N. Palayam | P. Vallioor | Palani | Pappireddipatti | Perambalur | Peravurani | Ponneri | Ponnamaravathi | Porur | Pudukkottai | Punalur | R. S. Mangalam | Rajapalayam | Ramanathapuram | Ranipet | Rasipuram | Salem | Sankarankovil | Sankari | Sathyamangalam | Sattur | Sendamangalam | Sirkali | Sivaganga | Sivagiri | Sivakasi | Soolamangalam | Surandai | Tambaram | Thanjavur | Theni Allinagaram | Thoothukudi | Thuraiyur | Tiruchendur | Tiruchirappalli | Tirukkoyilur | Tirunelveli | Tirupathur | Tirupattur | Tiruppur | Tirurangadi | Tiruttani | Tiruvallur | Tiruvannamalai | Tittakudi | Udumalaipettai | Ulagappam | Ulundurpet | Usilampatti | Uthiramerur | Vadakkuvalliyur | Vadalur | Vadipatti | Vaniyambadi | Vedaranyam | Vellakoil | Vellore | Velur | Vijayapuri | Vilathikulam | Villupuram | Virudhunagar | Vizhuppuram | Walajapet",



  " Agartala | Udaipur | Kailashahar | Dharmanagar | Belonia | Khowai | Ambassa | Amarpur | Sabroom | Kumarghat | Kamalpur | Sonamura | Ranirbazar | Bishalgarh | Teliamura | Melaghar | Panisagar | Jirania | Mohanpur | Boxanagar | Santirbazar | Teliamura | Fatikroy | Gakulpur | Jolaibari | Kathalia | Khowai | Khowai | Kumarghat | Laljuri | Manu | Pecharthal | Salema | Sonamura | Taranagar | Teliamura | Udaipur | Dharmanagar | Kailashahar",




  " Lucknow | Kanpur | Ghaziabad | Agra | Meerut | Varanasi | Allahabad | Bareilly | Aligarh | Moradabad | Saharanpur | Gorakhpur | Noida | Firozabad | Jhansi | Muzaffarnagar | Mathura | Budaun | Rampur | Shahjahanpur | Farrukhabad | Ayodhya | Raebareli | Lakhimpur Kheri | Mirzapur | Amroha | Hardoi | Sambhal | Sitapur | Etawah | Unnao | Jaunpur | Bahraich | Lakhimpur | Mathura | Bulandshahr | Bahraich | Etawah | Jaunpur | Sultanpur | Ambedkar Nagar | Azamgarh | Ballia | Banda | Barabanki | Basti | Bijnor | Chandauli | Chitrakoot | Deoria | Etah | Faizabad | Fatehgarh | Fatehpur | Ghazipur | Gonda | Hamirpur | Hapur | Hardoi | Hathras | Jalaun | Kannauj | Kasganj | Kaushambi | Kushinagar | Lakhimpur | Lalitpur | Mau | Moradabad | Pilibhit | Pratapgarh | Raebareli | Rampur | Saharanpur | Sant Kabir Nagar | Shravasti | Siddharthnagar | Sitapur | Sonbhadra | Sultanpur | Unnao | Auraiya | Amroha | Badaun | Baraut | Bilari | Bharthana | Bisalpur | Gajraula | Gorakhpur | Jalaun | Khalilabad | Kunda | Lalganj | Lakhimpur | Mawana | Maudaha | Mau | Mehnagar | Modi Nagar | Nanpara | Nakur | Naraura | Orai | Pilkhuwa | Puranpur | Robertsganj | Shikarpur | Siddharthnagar | Tilhar | Ujhani | Utraula | Bidhuna | Rudauli | Bilgram | Tanda | Bilsanda | Jakhania | Shikohabad | Aurangabad",



  " Dehradun | Haridwar | Roorkee | Haldwani | Rudrapur | Kashipur | Rishikesh | Ramnagar | Pithoragarh | Nainital | Kotdwar | Almora | Bageshwar | Mussoorie | Srinagar | Kichha | Jaspur | Rudraprayag | Tehri | Dharchula | Champawat | Sitarganj | Doiwala | Khatima | Barkot | Chakrata | Pauri | Narendra Nagar | Lansdowne | Devprayag | Gopeshwar | Uttarkashi | Joshimath | Landour | Lohaghat | Harsil | Almora | Berinag | Chaukhutia | Didihat | Dwarahat | Gangotri | Gopeshwar | Haldwani | Harsil | Kapkote | Kausani | Lohaghat | Munsiyari | Nainital | Pauri | Pithoragarh | Ramnagar | Ranikhet | Rudraprayag | Sald Mahadev | Sankri | Satpuli | Srinagar | Uttarkashi",



  " Kolkata | Howrah | Asansol | Siliguri | Durgapur | Bardhaman | Malda | Baharampur | Kharagpur | Darjeeling | Jalpaiguri | Alipurduar | Cooch Behar | Haldia | Raniganj | Balurghat | Krishnanagar | Midnapore | Bankura | Chandannagar | Barddhaman | Raiganj | Medinipur | Bhatpara | Ashokenagar-Kalyangarh | Dankuni | Hugli-Chinsurah | Raiganj | Kamarhati | Barrackpur | Taki | Katwa | Dhupguri | Kalna | Tarakeswar | Gangarampur | Bansberia | Barasat | Jangipur | Uluberia | Naihati | Habra | Bongaon | Dinhata | Haldibari | Raghunathpur | Memari | Sainthia | Dubrajpur | Rampurhat | Bishnupur | Panskura | Kakdwip | Budge Budge | Raghunathganj | Swarupnagar | Gangnapur | Nalhati | Kandi | Kharar | Chandrakona | Nabadwip | Dhulian | Basirhat | Kaliyaganj | Dalkhola | Ranaghat | Balurghat | Jhalda | Arambag | Bahula | Pujali | Khardah | Diamond Harbour | Dum Dum | Belghoria | Garden Reach | Konnagar | Baranagar | Budge Budge | South Dum Dum | Habra | Halisahar | Naihati | North Dumdum | Panihati | Rajpur Sonarpur | South Dum Dum | Titagarh | Bally | Bidhannagar | Kamarhati | Khardah | Madhyamgram | Murshidabad | New Barrackpore | North Dumdum | Panchla | Panskura | Patulia | Raghunathpur | Rajpur Sonarpur | Ranaghat | Santipur | Serampore | Shantipur | Singur | South Dum Dum | Sukchar | Titagarh | Uttarpara-Kotrung | Kulti | Jamuria"


];



const State = ({ delDetails, setDelDetails, name, title }) => {

  const [selectedIndex, setSelectedIndex] = useState()
  const [cities, setCities] = useState([]);
  //console.log(selectedIndex)

  const handleStateInput = (e) => {
    const { value, selectedIndex } = e.target;
    setDelDetails((prevDetails) => ({
      ...prevDetails,
      state: value,
    }));
    setSelectedIndex(selectedIndex)
  };

  const handleCityInput = (e) => {
    const { value } = e.target;
    setDelDetails((prevDetails) => ({
      ...prevDetails,
      city: value,
    }));
  };


  useEffect(() => {
    if (selectedIndex >= 0 && s_a[selectedIndex]) {
      setCities(s_a[selectedIndex].split("|"));
    } else {
      setCities([]);
    }
  }, [selectedIndex, name]);

  //console.log(selectedIndex  ,cities)


  return (
    <>
      <select onChange={handleStateInput} value={delDetails.state} style={{ width: "120px", marginLeft: "5px" }}>
        <option value="Select State" defaultValue={"Select State"}>Select state</option>
        {stateArr ? stateArr.map((elem, idx) => {
          return <option value={elem} key={idx}>{elem}</option>
      
        }) : ""}
      </select>

      <City cities={cities} handleCityInput={handleCityInput} title={title}></City>

    </>
  );
};

export default State;
