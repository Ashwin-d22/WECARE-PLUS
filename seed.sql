INSERT INTO hospitals (name,type,address,city,phone,latitude,longitude,emergency) VALUES
('WECARE City Hospital','Hospital','Main Road','Hyderabad','040-00000000',17.3850,78.4867,1),
('WECARE Diagnostic Center','Diagnostic Center','Central Avenue','Hyderabad','040-00000001',17.3980,78.4910,0);

INSERT INTO beds (hospital_id,bed_type,total,available) VALUES
(1,'ICU',20,5),(1,'General Ward',80,24),(1,'Emergency',12,4);
