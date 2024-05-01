import React, { useState, useEffect } from 'react';
import {CircularProgress} from "@mui/material";

function Page2() {
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedRegency, setSelectedRegency] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [Loading, setLoading] = useState(true)
    
    
    useEffect(() => {
        fetchProvinces().then(() => {
            setLoading(false);
        });
        return () => {
            setProvinces([]);
            setRegencies([]);
            setDistricts([]);
            setVillages([]);
            setSelectedProvince('');
            setSelectedRegency('');
            setSelectedDistrict('');
        }
    }, []);
    const fetchProvinces = async () => {
        try {
            const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
            const data = await response.json();
            data.sort((a, b) => a.name.localeCompare(b.name));
            setProvinces(data);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    const fetchRegencies = async (provinceId) => {
        try {
            const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
            const data = await response.json();
            data.sort((a, b) => a.name.localeCompare(b.name));
            setRegencies(data);
        } catch (error) {
            console.error('Error fetching regencies:', error);
        }
    };

    const fetchDistricts = async (regencyId) => {
        try {
            const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`);
            const data = await response.json();
            data.sort((a, b) => a.name.localeCompare(b.name));
            setDistricts(data);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const fetchVillages = async (districtId) => {
        try {
            const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`);
            const data = await response.json();
            data.sort((a, b) => a.name.localeCompare(b.name));
            setVillages(data);
        } catch (error) {
            console.error('Error fetching villages:', error);
        }
    };

    const handleProvinceChange = (e) => {
        const provinceId = e.target.value;
        setSelectedProvince(provinceId);
        setSelectedRegency('');
        setSelectedDistrict('');
        setRegencies([]);
        setDistricts([]);
        setVillages([]);
        fetchRegencies(provinceId);
    };

    const handleRegencyChange = (e) => {
        const regencyId = e.target.value;
        setSelectedRegency(regencyId);
        setSelectedDistrict('');
        setDistricts([]);
        setVillages([]);
        fetchDistricts(regencyId);
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);
        setVillages([]);
        fetchVillages(districtId);
    };

    return (
        <>
            {Loading ? (
                <CircularProgress color="success" />
            ) : (
                <>
                    <label>Province:</label>
                    <select value={selectedProvince} onChange={handleProvinceChange}>
                        <option value="">Select Province</option>
                        {provinces.map(province => (
                            <option key={province.id} value={province.id}>{province.name}</option>
                        ))}
                    </select>

                    <label>Regency:</label>
                    <select value={selectedRegency} onChange={handleRegencyChange}>
                        <option value="">Select Regency</option>
                        {regencies.map(regency => (
                            <option key={regency.id} value={regency.id}>{regency.name}</option>
                        ))}
                    </select>

                    <label>District:</label>
                    <select value={selectedDistrict} onChange={handleDistrictChange}>
                        <option value="">Select District</option>
                        {districts.map(district => (
                            <option key={district.id} value={district.id}>{district.name}</option>
                        ))}
                    </select>

                    <label>Village:</label>
                    <select>
                        <option value="">Select Village</option>
                        {villages.map(village => (
                            <option key={village.id} value={village.id}>{village.name}</option>
                        ))}
                    </select>
                </>
            )}
        </>
    );
}



export default Page2;