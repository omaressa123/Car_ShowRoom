<mxfile host="app.diagrams.net">
  <diagram id="activity-diagram" name="Page-1">
    <mxGraphModel dx="2579" dy="676" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="1900" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="2" parent="1" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;fontSize=15;fontStyle=1;verticalAlign=top;align=center;" value="Car showroom System - Activity Diagram (UC-01..UC-08)" vertex="1">
          <mxGeometry height="50" width="1120" x="30" y="10" as="geometry" />
        </mxCell>
        <mxCell id="10" parent="1" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;align=center;verticalAlign=middle;" value="UC-01: User Registration" vertex="1">
          <mxGeometry height="30" width="400" x="60" y="80" as="geometry" />
        </mxCell>
        <mxCell id="11" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="Start" vertex="1">
          <mxGeometry height="40" width="120" x="130" y="120" as="geometry" />
        </mxCell>
        <mxCell id="12" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(1) User selects Sign Up" vertex="1">
          <mxGeometry height="40" width="240" x="100" y="170" as="geometry" />
        </mxCell>
        <mxCell id="13" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(2) System requests personal details" vertex="1">
          <mxGeometry height="40" width="320" x="60" y="220" as="geometry" />
        </mxCell>
        <mxCell id="14" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(3) User provides details + chooses username/email/password" vertex="1">
          <mxGeometry height="40" width="360" x="40" y="270" as="geometry" />
        </mxCell>
        <mxCell id="15" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(4) System validates SSN &amp; username are unique" vertex="1">
          <mxGeometry height="40" width="340" x="50" y="320" as="geometry" />
        </mxCell>
        <mxCell id="16" parent="1" style="shape=rhombus;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;align=center;fillColor=#f5f5f5;strokeColor=#666666;gradientColor=#b3b3b3;" value="Duplicate SSN or Username?" vertex="1">
          <mxGeometry height="54" width="240" x="110" y="370" as="geometry" />
        </mxCell>
        <mxCell id="17" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="Alt: Display error &amp; prompt correction" vertex="1">
          <mxGeometry height="40" width="280" x="320" y="430" as="geometry" />
        </mxCell>
        <mxCell id="18" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(5) Create Customer profile + linked Account (Customer role)" vertex="1">
          <mxGeometry height="40" width="420" x="-140" y="430" as="geometry" />
        </mxCell>
        <mxCell id="19" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(6) Confirm successful registration" vertex="1">
          <mxGeometry height="40" width="260" x="10" y="490" as="geometry" />
        </mxCell>
        <mxCell id="20" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="End" vertex="1">
          <mxGeometry height="40" width="120" x="-40" y="550" as="geometry" />
        </mxCell>
        <mxCell id="100" edge="1" parent="1" source="11" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="12" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="101" edge="1" parent="1" source="12" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="13" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="102" edge="1" parent="1" source="13" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="14" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="103" edge="1" parent="1" source="14" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="15" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="104" edge="1" parent="1" source="15" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="16" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="105" edge="1" parent="1" source="16" style="endArrow=block;html=1;rounded=0;strokeColor=#cc6600;" target="17" value="Yes (duplicate)">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="106" edge="1" parent="1" source="17" style="endArrow=block;html=1;rounded=0;strokeColor=#cc6600;" target="14" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="107" edge="1" parent="1" source="16" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="18" value="No (unique)">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="108" edge="1" parent="1" source="18" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="19" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="109" edge="1" parent="1" source="19" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="20" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="30" parent="1" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;align=center;verticalAlign=middle;" value="UC-02: User Login" vertex="1">
          <mxGeometry height="30" width="400" x="60" y="570" as="geometry" />
        </mxCell>
        <mxCell id="31" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="Start" vertex="1">
          <mxGeometry height="40" width="120" x="130" y="610" as="geometry" />
        </mxCell>
        <mxCell id="32" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(1) User enters username &amp; password" vertex="1">
          <mxGeometry height="40" width="320" x="60" y="660" as="geometry" />
        </mxCell>
        <mxCell id="33" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(2) System verifies credentials in accounts" vertex="1">
          <mxGeometry height="40" width="340" x="50" y="710" as="geometry" />
        </mxCell>
        <mxCell id="34" parent="1" style="shape=rhombus;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;align=center;fillColor=#f5f5f5;strokeColor=#666666;gradientColor=#b3b3b3;" value="Credentials valid?" vertex="1">
          <mxGeometry height="54" width="210" x="145" y="760" as="geometry" />
        </mxCell>
        <mxCell id="35" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="Alt: Invalid username/password" vertex="1">
          <mxGeometry height="40" width="260" x="320" y="820" as="geometry" />
        </mxCell>
        <mxCell id="36" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(3) Identify role_id + related entity (emp_ssn/cust_ssn)" vertex="1">
          <mxGeometry height="40" width="460" x="-260" y="820" as="geometry" />
        </mxCell>
        <mxCell id="37" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(4) Redirect to Customer Portal or Admin Panel" vertex="1">
          <mxGeometry height="40" width="360" x="-80" y="880" as="geometry" />
        </mxCell>
        <mxCell id="38" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="End" vertex="1">
          <mxGeometry height="40" width="120" x="235" y="960" as="geometry" />
        </mxCell>
        <mxCell id="120" edge="1" parent="1" source="31" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="32" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="121" edge="1" parent="1" source="32" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="33" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="122" edge="1" parent="1" source="33" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="34" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="123" edge="1" parent="1" source="34" style="endArrow=block;html=1;rounded=0;strokeColor=#cc6600;" target="35" value="No">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="124" edge="1" parent="1" source="35" style="endArrow=block;html=1;rounded=0;strokeColor=#cc6600;" target="38" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="125" edge="1" parent="1" source="34" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="36" value="Yes">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="126" edge="1" parent="1" source="36" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="37" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="127" edge="1" parent="1" source="37" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="38" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="50" parent="1" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;align=center;verticalAlign=middle;" value="UC-03: Manage Car Inventory" vertex="1">
          <mxGeometry height="30" width="460" x="60" y="1010" as="geometry" />
        </mxCell>
        <mxCell id="51" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="Start" vertex="1">
          <mxGeometry height="40" width="120" x="130" y="1050" as="geometry" />
        </mxCell>
        <mxCell id="52" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(1) Admin selects Manage Inventory" vertex="1">
          <mxGeometry height="40" width="320" x="60" y="1100" as="geometry" />
        </mxCell>
        <mxCell id="53" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(2) Enter car details (Company/Model/Year/Colors)" vertex="1">
          <mxGeometry height="40" width="520" x="20" y="1150" as="geometry" />
        </mxCell>
        <mxCell id="54" parent="1" style="shape=rhombus;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;align=center;fillColor=#f5f5f5;strokeColor=#666666;gradientColor=#b3b3b3;" value="Model/Company exists?" vertex="1">
          <mxGeometry height="54" width="250" x="65" y="1206" as="geometry" />
        </mxCell>
        <mxCell id="55" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="Alt: Prompt create missing specification first" vertex="1">
          <mxGeometry height="40" width="340" x="200" y="1276" as="geometry" />
        </mxCell>
        <mxCell id="56" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(3) Assign to Branch + set no_of_cars" vertex="1">
          <mxGeometry height="40" width="420" x="-270" y="1254" as="geometry" />
        </mxCell>
        <mxCell id="57" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(4) Save car details + update inventory levels" vertex="1">
          <mxGeometry height="40" width="420" x="-190" y="1310" as="geometry" />
        </mxCell>
        <mxCell id="58" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="End" vertex="1">
          <mxGeometry height="40" width="120" x="130" y="1360" as="geometry" />
        </mxCell>
        <mxCell id="140" edge="1" parent="1" source="51" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="52" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="141" edge="1" parent="1" source="52" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="53" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="142" edge="1" parent="1" source="53" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="54" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="143" edge="1" parent="1" source="54" style="endArrow=block;html=1;rounded=0;strokeColor=#cc6600;" target="55" value="No">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="144" edge="1" parent="1" source="55" style="endArrow=block;html=1;rounded=0;strokeColor=#cc6600;" target="53" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="145" edge="1" parent="1" source="54" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="56" value="Yes">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="146" edge="1" parent="1" source="56" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="57" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="147" edge="1" parent="1" source="57" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="58" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="70" parent="1" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;align=center;verticalAlign=middle;" value="UC-04: Update Car Pricing" vertex="1">
          <mxGeometry height="30" width="460" x="-10" y="1415" as="geometry" />
        </mxCell>
        <mxCell id="71" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="Start" vertex="1">
          <mxGeometry height="40" width="120" x="130" y="1450" as="geometry" />
        </mxCell>
        <mxCell id="72" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(1) Admin selects a car from inventory" vertex="1">
          <mxGeometry height="40" width="380" x="40" y="1500" as="geometry" />
        </mxCell>
        <mxCell id="73" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(2) Enter new rental price + effective date" vertex="1">
          <mxGeometry height="40" width="420" x="40" y="1550" as="geometry" />
        </mxCell>
        <mxCell id="74" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(3) Store in Car_Price_History" vertex="1">
          <mxGeometry height="40" width="420" x="40" y="1600" as="geometry" />
        </mxCell>
        <mxCell id="75" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="End" vertex="1">
          <mxGeometry height="40" width="120" x="150" y="1650" as="geometry" />
        </mxCell>
        <mxCell id="160" edge="1" parent="1" source="71" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="72" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="161" edge="1" parent="1" source="72" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="73" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="162" edge="1" parent="1" source="73" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="74" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="163" edge="1" parent="1" source="74" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="75" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="90" parent="1" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;align=center;verticalAlign=middle;" value="UC-05: Manage Branches" vertex="1">
          <mxGeometry height="30" width="420" x="560" y="80" as="geometry" />
        </mxCell>
        <mxCell id="91" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="Start" vertex="1">
          <mxGeometry height="40" width="120" x="690" y="120" as="geometry" />
        </mxCell>
        <mxCell id="92" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(1) Enter branch location + contact number" vertex="1">
          <mxGeometry height="40" width="360" x="600" y="170" as="geometry" />
        </mxCell>
        <mxCell id="93" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(2) Validate city exists in city table" vertex="1">
          <mxGeometry height="40" width="420" x="560" y="220" as="geometry" />
        </mxCell>
        <mxCell id="94" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(3) Create branch" vertex="1">
          <mxGeometry height="40" width="220" x="670" y="270" as="geometry" />
        </mxCell>
        <mxCell id="95" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="End" vertex="1">
          <mxGeometry height="40" width="120" x="690" y="320" as="geometry" />
        </mxCell>
        <mxCell id="180" edge="1" parent="1" source="91" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="92" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="181" edge="1" parent="1" source="92" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="93" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="182" edge="1" parent="1" source="93" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="94" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="183" edge="1" parent="1" source="94" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="95" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="110" parent="1" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;align=center;verticalAlign=middle;" value="UC-06: Search &amp; Filter Cars" vertex="1">
          <mxGeometry height="30" width="520" x="560" y="370" as="geometry" />
        </mxCell>
        <mxCell id="111" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="Start" vertex="1">
          <mxGeometry height="40" width="120" x="690" y="410" as="geometry" />
        </mxCell>
        <mxCell id="112" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(1) Select search criteria" vertex="1">
          <mxGeometry height="40" width="360" x="600" y="460" as="geometry" />
        </mxCell>
        <mxCell id="113" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(2) Query Car, car_branch, car_color" vertex="1">
          <mxGeometry height="40" width="440" x="560" y="510" as="geometry" />
        </mxCell>
        <mxCell id="114" parent="1" style="shape=rhombus;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;align=center;fillColor=#f5f5f5;strokeColor=#666666;gradientColor=#b3b3b3;" value="Any results?" vertex="1">
          <mxGeometry height="54" width="200" x="710" y="560" as="geometry" />
        </mxCell>
        <mxCell id="115" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="Alt: Suggest broader criteria / other branches" vertex="1">
          <mxGeometry height="40" width="380" x="860" y="620" as="geometry" />
        </mxCell>
        <mxCell id="116" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(3) Display matching cars + current prices" vertex="1">
          <mxGeometry height="40" width="380" x="600" y="620" as="geometry" />
        </mxCell>
        <mxCell id="117" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="End" vertex="1">
          <mxGeometry height="40" width="120" x="740" y="670" as="geometry" />
        </mxCell>
        <mxCell id="200" edge="1" parent="1" source="111" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="112" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="201" edge="1" parent="1" source="112" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="113" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="202" edge="1" parent="1" source="113" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="114" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="203" edge="1" parent="1" source="114" style="endArrow=block;html=1;rounded=0;strokeColor=#cc6600;" target="115" value="No">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="204" edge="1" parent="1" source="115" style="endArrow=block;html=1;rounded=0;strokeColor=#cc6600;" target="117" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="205" edge="1" parent="1" source="114" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="116" value="Yes">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="206" edge="1" parent="1" source="116" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="117" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="130" parent="1" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;align=center;verticalAlign=middle;" value="UC-07: Create Contract" vertex="1">
          <mxGeometry height="30" width="580" x="560" y="770" as="geometry" />
        </mxCell>
        <mxCell id="131" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="Start" vertex="1">
          <mxGeometry height="40" width="120" x="760" y="814" as="geometry" />
        </mxCell>
        <mxCell id="132" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(1) Customer selects car + branch" vertex="1">
          <mxGeometry height="40" width="420" x="600" y="860" as="geometry" />
        </mxCell>
        <mxCell id="133" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(2) Employee verifies SSN + car availability" vertex="1">
          <mxGeometry height="40" width="480" x="560" y="910" as="geometry" />
        </mxCell>
        <mxCell id="134" parent="1" style="shape=rhombus;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;align=center;fillColor=#f5f5f5;strokeColor=#666666;gradientColor=#b3b3b3;" value="Car in stock?" vertex="1">
          <mxGeometry height="54" width="220" x="690" y="953" as="geometry" />
        </mxCell>
        <mxCell id="135" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="Alt: Out of Stock - block contract creation" vertex="1">
          <mxGeometry height="40" width="420" x="1000" y="962" as="geometry" />
        </mxCell>
        <mxCell id="136" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(3) Retrieve latest price from Car_Price_History" vertex="1">
          <mxGeometry height="40" width="560" x="560" y="1020" as="geometry" />
        </mxCell>
        <mxCell id="137" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(4) User selects payment_method" vertex="1">
          <mxGeometry height="40" width="420" x="600" y="1070" as="geometry" />
        </mxCell>
        <mxCell id="138" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(5) Generate Contract record (link parties + car)" vertex="1">
          <mxGeometry height="40" width="540" x="560" y="1120" as="geometry" />
        </mxCell>
        <mxCell id="139" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(6) Update car_branch.no_of_cars" vertex="1">
          <mxGeometry height="40" width="420" x="580" y="1180" as="geometry" />
        </mxCell>
        <mxCell id="8VLfA4ZlPYRT27d72Vp5-206" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="End" vertex="1">
          <mxGeometry height="40" width="120" x="1080" y="1190" as="geometry" />
        </mxCell>
        <mxCell id="220" edge="1" parent="1" source="131" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="132" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="221" edge="1" parent="1" source="132" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="133" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="222" edge="1" parent="1" source="133" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="134" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="223" edge="1" parent="1" source="134" style="endArrow=block;html=1;rounded=0;strokeColor=#cc6600;" target="135" value="No">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="224" edge="1" parent="1" source="135" style="endArrow=block;html=1;rounded=0;strokeColor=#cc6600;" target="140" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="225" edge="1" parent="1" source="134" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="136" value="Yes">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="226" edge="1" parent="1" source="136" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="137" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="227" edge="1" parent="1" source="137" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="138" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="228" edge="1" parent="1" source="138" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="139" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="229" edge="1" parent="1" source="139" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="140" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="150" parent="1" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;align=center;verticalAlign=middle;" value="UC-08: Manage User Roles" vertex="1">
          <mxGeometry height="30" width="520" x="580" y="1250" as="geometry" />
        </mxCell>
        <mxCell id="151" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="Start" vertex="1">
          <mxGeometry height="40" width="120" x="710" y="1280" as="geometry" />
        </mxCell>
        <mxCell id="152" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(1) Admin selects Manage User Roles (Account Management)" vertex="1">
          <mxGeometry height="40" width="560" x="530" y="1340" as="geometry" />
        </mxCell>
        <mxCell id="153" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(2) System lists users/accounts and current roles" vertex="1">
          <mxGeometry height="40" width="500" x="580" y="1405" as="geometry" />
        </mxCell>
        <mxCell id="154" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(3) Admin assigns new role_id / permissions" vertex="1">
          <mxGeometry height="40" width="420" x="610" y="1480" as="geometry" />
        </mxCell>
        <mxCell id="155" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" value="(4) System updates roles and applies access control" vertex="1">
          <mxGeometry height="40" width="520" x="550" y="1560" as="geometry" />
        </mxCell>
        <mxCell id="156" parent="1" style="ellipse;whiteSpace=wrap;html=1;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" value="End" vertex="1">
          <mxGeometry height="40" width="120" x="710" y="1650" as="geometry" />
        </mxCell>
        <mxCell id="240" edge="1" parent="1" source="151" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="152" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="241" edge="1" parent="1" source="152" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="153" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="242" edge="1" parent="1" source="153" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="154" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="243" edge="1" parent="1" source="154" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="155" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="244" edge="1" parent="1" source="155" style="endArrow=block;html=1;rounded=0;strokeColor=#444444;" target="156" value="">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="Vm6wmJx0ztdBazJb_Yv9-244" edge="1" parent="1" source="139" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.307;entryY=0.076;entryDx=0;entryDy=0;entryPerimeter=0;" target="8VLfA4ZlPYRT27d72Vp5-206">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
