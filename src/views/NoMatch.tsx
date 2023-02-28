import React from 'react';
import {Link} from "react-router-dom";
import Section from "@/components/Section";

const NoMatch = () => (
    <Section delay={0.1}>
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    </Section>
);

export default NoMatch;