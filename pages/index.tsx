import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import CustomSelect from "../components/CustomSelect";
import axios from "axios";
import { useEffect, useState } from "react";
import { countries } from "../lib/data";
import { BsArrowBarRight } from "react-icons/bs";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async () => {
  // Geting data from git gist.  Thanks to Nuhil Group .
  const res1 = await axios.get(
    "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/districts/districts.json"
  );
  const res2 = await axios.get(
    "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/divisions/divisions.json"
  );
  const res3 = await axios.get(
    "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/unions/unions.json"
  );
  const res4 = await axios.get(
    "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/upazilas/upazilas.json"
  );

  return {
    props: {
      districts: res1.data[2].data,

      // in division : there have no country id... thats why i address courty id for bangladesh ....
      divisions: res2.data[2].data.map((item) => {
        return { ...item, country_id: "1" };
      }),
      upazilas: res4.data[2].data,
      union: res3.data[2].data,

      // made some content for country demo in data file .
      countries,
    },
  };
};

// Declaring some Data type for our data . .. made it easier to develop
interface CountryType {
  id: string;
  name: string;
  bn_name: string;
  lat: string;
  long: string;
}

interface DistrictType {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  lon: string;
  url: string;
}
interface DivisionType {
  id: string;
  country_id: string;
  name: string;
  bn_name: string;
  url: string;
}
interface UpazillaType {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url: string;
}
interface UnionType {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url: string;
}

interface PropsType {
  countries: CountryType[];
  divisions: DivisionType[];
  districts: DistrictType[];
  upazilas: UpazillaType[];
  union: UnionType[];
}

export default function Home(props: PropsType) {
  // Billing address Form state. ....
  const [siteName, setSiteName] = useState("");
  const [country, setCountry] = useState<CountryType | string>("");
  const [devision, setDevision] = useState<DivisionType | string>("");
  const [district, setDistrict] = useState<DistrictType | string>("");
  const [city, setCity] = useState<UpazillaType | string>("");
  const [union, setUnion] = useState<UnionType | string>("");
  const [zipcode, setZipcode] = useState("");
  const [village, setVillage] = useState("");
  const [apartment, setApartment] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");

  //Ending: Billing address Form state. ....

  // Shipping address form state
  const [shipSiteName, setShipSiteName] = useState("");
  const [shipCountry, setShipCountry] = useState<CountryType | string>("");
  const [shipDevision, setShipDevision] = useState<DivisionType | string>("");
  const [shipDistrict, setShipDistrict] = useState<DistrictType | string>("");
  const [shipCity, setShipCity] = useState<UpazillaType | string>("");
  const [shipUnion, setShipUnion] = useState<UnionType | string>("");
  const [shipZipcode, setShipZipcode] = useState("");
  const [shipVillage, setShipVillage] = useState("");
  const [shipApartment, setShipApartment] = useState("");
  const [shipPhone, setShipPhone] = useState("");
  const [shipFax, setShipFax] = useState("");

  // Ending: Shipping address form state

  // Billing Address effect
  useEffect(() => {
    if (!country || country.id !== devision.country_id) {
      setDevision("");
    }
    if (!devision || devision.id !== district.division_id) {
      setDistrict("");
    }
    if (!district || district.id !== city.district_id) {
      if (!city.customeSelect || !district) {
        setCity("");
      }
    }
    if (!city || city.id !== union.upazilla_id) {
      if (!union.customeSelect || !city) {
        setUnion("");
      }
    }
    if (!union || union.id !== zipcode?.union_id) {
      if (!zipcode.customeSelect || !union) {
        setZipcode("");
      }
    }
    if (!zipcode || zipcode.id !== village?.union_id) {
      if (!village.customeSelect || !zipcode) {
        setVillage("");
      }
    }
  }, [country, devision, district, city, union, zipcode, village]);
  //Ending: Billing Address effect

  // Shipping Address Effect
  useEffect(() => {
    if (!shipCountry || shipCountry.id !== shipDevision.country_id) {
      setShipDevision("");
    }
    if (!shipDevision || shipDevision.id !== shipDistrict.division_id) {
      setShipDistrict("");
    }
    if (!shipDistrict || shipDistrict.id !== shipCity.district_id) {
      if (!shipCity.customeSelect || !shipDistrict) {
        setShipCity("");
      }
    }
    if (!shipCity || shipCity.id !== shipUnion.upazilla_id) {
      if (!shipUnion.customeSelect || !shipCity) {
        setShipUnion("");
      }
    }
    if (!shipUnion || shipUnion.id !== shipZipcode.upazilla_id) {
      if (!shipZipcode.customeSelect || !shipUnion) {
        setShipZipcode("");
      }
    }
    if (!shipZipcode || shipZipcode.id !== shipVillage.upazilla_id) {
      if (!shipVillage.customeSelect || !shipZipcode) {
        setShipVillage("");
      }
    }
  }, [
    shipCountry,
    shipDevision,
    shipDistrict,
    shipCity,
    shipUnion,
    shipZipcode,
    shipVillage,
  ]);

  //Ending: Shipping Address Effect

  // filtering data for billing address

  const filteredDivision = props.divisions.filter(
    (division: DivisionType) => division.country_id === country.id
  );

  const filteredDistrict = props.districts.filter(
    (district: DistrictType) => district.division_id === devision.id
  );
  const filteredCity = props.upazilas.filter(
    (upazila: UpazillaType) => upazila.district_id === district.id
  );

  const filteredUnion = city.customeSelect
    ? []
    : props.union.filter((union: UnionType) => {
        return union.upazilla_id === city.id;
      });

  // Ending: Filtering data for billing address

  // Filtering data for shipping address

  const filteredShipDivision = props.divisions.filter(
    (division: DivisionType) => division.country_id === shipCountry.id
  );

  const filteredShipDistrict = props.districts.filter(
    (district: DistrictType) => district.division_id === shipDevision.id
  );
  const filteredShipCity = props.upazilas.filter(
    (upazila: UpazillaType) => upazila.district_id === shipDistrict.id
  );
  const filteredShipUnion = shipCity.customeSelect
    ? []
    : props.union.filter((union: UnionType) => {
        return union.upazilla_id === shipCity.id;
      });

  // Ending : filtering data for shipping address

  // Billing address copeing to Shipping address

  const handlerCopyToShipping = () => {
    // First I am checking if any field is empty in billing address then i will not copy . and i will show warning
    if (
      siteName === "" ||
      country === "" ||
      devision === "" ||
      district === "" ||
      city === "" ||
      union === "" ||
      zipcode === "" ||
      village === "" ||
      apartment === "" ||
      phone === "" ||
      fax === ""
    ) {
      toast.error("Some fiels is empty in billing address!");

      return;
    }

    // Here i changing value of shipping address data state.
    setShipSiteName(siteName);
    setShipCountry(country);
    setShipDevision(devision);
    setShipDistrict(district);
    setShipCity(city);
    setShipUnion(union);
    setShipZipcode(zipcode);
    setShipVillage(village);
    setShipApartment(apartment);
    setShipPhone(phone);
    setShipFax(fax);
  };

  //Ending: Billing address copeing to Shipping address

  //Save address and database to use future

  const saveHandler = () => {
    // Checked : if any content is empty ... then i will not continuie
    if (
      siteName === "" ||
      country === "" ||
      devision === "" ||
      district === "" ||
      city === "" ||
      union === "" ||
      zipcode === "" ||
      village === "" ||
      apartment === "" ||
      phone === "" ||
      fax === "" ||
      shipSiteName === "" ||
      shipCountry === "" ||
      shipDevision === "" ||
      shipDistrict === "" ||
      shipCity === "" ||
      shipUnion === "" ||
      shipZipcode === "" ||
      shipVillage === "" ||
      shipApartment === "" ||
      shipPhone === "" ||
      shipFax === ""
    ) {
      toast.error("Some fiels is empty ");

      return;
    }

    // made an object of Selected addresses data
    const newAddress = {
      billingAddress: {
        siteName,
        country: country.name,
        devision: devision.name,
        district: district.name,
        city: city.name,
        union: union.name,
        zipcode: zipcode.name,
        village: village.name,
        apartment,
        phone,
        fax,
      },
      shippingAddress: {
        shipSiteName,
        shipCountry: shipCountry.name,
        shipDevision: shipDevision.name,
        shipDistrict: shipDistrict.name,
        shipCity: shipCity.name,
        shipUnion: shipUnion.name,
        shipZipcode: shipZipcode.name,
        shipVillage: shipVillage.name,
        shipApartment,
        shipPhone,
        shipFax,
      },
    };

    toast.success("I made an object of address. Check console plz!");

    // Consoling the output
    console.log(newAddress);
  };

  //Ending: Save address and database to use future

  return (
    <>
      <Head>
        <title>Bangladesh_ERP</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.form_area}>
          <div className={styles.billing_area}>
            <div>
              <h1>Billing Address</h1>
            </div>
            <form>
              <div className={styles.form_field}>
                <label htmlFor="Name">Attention</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter person/site name"
                  value={siteName}
                  onChange={(e) => {
                    setSiteName(e.target.value);
                  }}
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="country">Country</label>
                <CustomSelect
                  data={props.countries}
                  selectedItem={country}
                  setSelectedItem={setCountry}
                  placeholder="Select country"
                  isDisabled={false}
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="division">Devision/Province/State</label>
                <CustomSelect
                  data={filteredDivision}
                  selectedItem={devision}
                  setSelectedItem={setDevision}
                  placeholder="Select Division"
                  isDisabled={!country}
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="district">District</label>
                <CustomSelect
                  data={filteredDistrict}
                  selectedItem={district}
                  placeholder="Select District"
                  setSelectedItem={setDistrict}
                  isDisabled={!devision}
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="city">City/Sub District/Thana</label>
                <CustomSelect
                  data={filteredCity}
                  selectedItem={city}
                  placeholder="Select City"
                  setSelectedItem={setCity}
                  isDisabled={!district}
                  anyInput
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="area">Union/Area/Town</label>
                <CustomSelect
                  data={filteredUnion}
                  selectedItem={union}
                  placeholder="Select Union/Area/Town"
                  setSelectedItem={setUnion}
                  isDisabled={!city}
                  anyInput
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="zipcode">Zipcode</label>
                <CustomSelect
                  data={[]}
                  selectedItem={zipcode}
                  placeholder="Select zipcode"
                  setSelectedItem={setZipcode}
                  isDisabled={!union}
                  anyInput
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="village">Street Adress/Village</label>
                <CustomSelect
                  data={[]}
                  selectedItem={village}
                  placeholder="Select Village"
                  setSelectedItem={setVillage}
                  isDisabled={!zipcode}
                  anyInput
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="apartment">House/Suite/apartment no</label>
                <input
                  type="text"
                  name="apartment"
                  value={apartment}
                  onChange={(e) => {
                    setApartment(e.target.value);
                  }}
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="fax">Fax</label>
                <input
                  type="text"
                  name="fax"
                  value={fax}
                  onChange={(e) => {
                    setFax(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
          <div className={styles.shipping_area}>
            <div>
              <h1 className={styles.shipping_header}>
                <span>Shipping Address</span>{" "}
                <button onClick={handlerCopyToShipping}>
                  {" "}
                  <BsArrowBarRight /> Copy Billing Address
                </button>
              </h1>
              <p>Attention</p>
            </div>
            <form>
              <div className={styles.form_field}>
                <label htmlFor="Name"></label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter person/site name"
                  value={shipSiteName}
                  onChange={(e) => {
                    setShipSiteName(e.target.value);
                  }}
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="country">Country</label>
                <CustomSelect
                  data={props.countries}
                  placeholder="Select Country"
                  selectedItem={shipCountry}
                  setSelectedItem={setShipCountry}
                  isDisabled={false}
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="division">Devision/Province/State</label>
                <CustomSelect
                  data={filteredShipDivision}
                  selectedItem={shipDevision}
                  placeholder="Select Division"
                  setSelectedItem={setShipDevision}
                  isDisabled={!shipCountry}
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="district">District</label>
                <CustomSelect
                  data={filteredShipDistrict}
                  selectedItem={shipDistrict}
                  placeholder="Select District"
                  setSelectedItem={setShipDistrict}
                  isDisabled={!shipDevision}
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="city">City/Sub District/Thana</label>
                <CustomSelect
                  data={filteredShipCity}
                  selectedItem={shipCity}
                  placeholder="Select City"
                  setSelectedItem={setShipCity}
                  isDisabled={!shipDistrict}
                  anyInput
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="area">Union/Area/Town</label>
                <CustomSelect
                  data={filteredShipUnion}
                  selectedItem={shipUnion}
                  placeholder="Select Union/Area/Town"
                  setSelectedItem={setShipUnion}
                  isDisabled={!shipCity}
                  anyInput
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="zipcode">Zipcode</label>
                <CustomSelect
                  data={[]}
                  selectedItem={shipZipcode}
                  placeholder="Select Zipcode"
                  setSelectedItem={setShipZipcode}
                  isDisabled={!shipUnion}
                  anyInput
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="village">Street Adress/Village</label>
                <CustomSelect
                  data={[]}
                  selectedItem={shipVillage}
                  placeholder="Select Village"
                  setSelectedItem={setShipVillage}
                  isDisabled={!shipZipcode}
                  anyInput
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="apartment">House/Suite/apartment no</label>
                <input
                  type="text"
                  name="apartment"
                  value={shipApartment}
                  onChange={(e) => {
                    setShipApartment(e.target.value);
                  }}
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={shipPhone}
                  onChange={(e) => {
                    setShipPhone(e.target.value);
                  }}
                />
              </div>
              <div className={styles.form_field}>
                <label htmlFor="fax">Fax</label>
                <input
                  type="text"
                  name="fax"
                  value={shipFax}
                  onChange={(e) => {
                    setShipFax(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
        </section>
        <div style={{ textAlign: "right" }}>
          <button className="continue_btn" onClick={saveHandler}>
            Continue
          </button>
        </div>
      </main>
    </>
  );
}
